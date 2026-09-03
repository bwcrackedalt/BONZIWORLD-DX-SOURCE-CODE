import * as Utils from "./utils.ts";
import { normalizeForFilter } from "./utils.ts";
import { io, app } from "./app.ts";
import { readFileSync } from "node:fs";
import express from "express";
import * as db from "./database.ts";
import type { Socket } from "socket.io";
import type { IncomingHttpHeaders } from "node:http";
import z from "zod";

const settings = JSON.parse(
	readFileSync(new URL("./settings.json", import.meta.url), "utf8"),
);
const vaultCodes = JSON.parse(
	readFileSync(new URL("./vault.json", import.meta.url), "utf8"),
);

try {
        process.loadEnvFile(".env");
} catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
                throw error;
        }
}

let higherKings = (process.env.HIGHER_KINGS ?? "").split(",").filter(Boolean);
let lowerKings = (process.env.LOWER_KINGS ?? "").split(",").filter(Boolean);

function socketIp(socket: Socket): string {
        if (process.env.USE_X_REAL_IP !== "false") {
                const headers = socket.handshake.headers as IncomingHttpHeaders;
                const ip = headers["x-real-ip"];
                return typeof ip === "string" ? ip : socket.handshake.address;
        }
        return socket.handshake.address;
}

function godwordRunlevel(godword: string): number {
        if (godword === process.env.GODWORD) {
                return 4;
        }
        if (higherKings.includes(godword)) {
                return 3;
        }
        if (lowerKings.includes(godword)) {
                return 2;
        }
        return 0;
}

app.post("/vault", express.json(), async (req, res) => {
        let cookie = req.cookie.token;
        if (!cookie) {
                res.json({ error: "Invalid cookie" });
                return;
        }
        let vaultSchema = z.object({ 
                tag: z.string().nullable().optional(), 
                guess: z.string(),
        });
        let vaultBody = vaultSchema.safeParse(req.body);
        if (!vaultBody.success) {
                res.json({ message: "Invalid request body", tag: null });
                return;
        }
        const { tag, guess } = vaultBody.data;
        for (let code of vaultCodes.codes) {
                if (code.tag == null || code.tag == tag) {
                        if (code.matches == null || new RegExp(code.matches, "i").test(guess)) {
                                if (code.unlocks) {
                                        await db.unlockHat(cookie, code.unlocks);
                                }
                                const nextTag = typeof code.response === "string" ? null : (code.response.tag ?? null);
                                res.json({
                                        message: typeof code.response === "string" ? code.response : code.response.text,
                                        tag: nextTag,
                                        unlock: code.unlocks ?? null,
                                });
                                return;
                        }
                }
        }
        let randomResponse = vaultCodes.randomDialog[Math.floor(Math.random() * vaultCodes.randomDialog.length)];
        res.json({
                message: typeof randomResponse === "string" ? randomResponse : randomResponse.text,
                tag: typeof randomResponse === "string" ? null : randomResponse.tag,
        });
        return;
});

type filter = {
        regex: RegExp;
        replacement: string;
};

let filters: filter[] = [];
for (const [regex, replacement] of Object.entries(settings.filters as Record<string, string>)) {
        filters.push({
                regex: new RegExp(regex, "gv"),
                replacement,
        });
}

function censor(txt: string) {
        for (let filter of filters) {
                txt = txt.replace(filter.regex, filter.replacement);
        }
        return txt;
}

let autoNukeNames: RegExp[] = (settings.autoNukeNames as string[]).map(r => new RegExp(r, "i"));
let autoNukeWords: RegExp[] = (settings.autoNukeWords as string[]).map(r => new RegExp(r, "i"));

function shouldAutoNukeName(name: string): boolean {
        const normalized = normalizeForFilter(name);
        return autoNukeNames.some(r => r.test(normalized));
}

function shouldAutoNukeWord(text: string): boolean {
        const normalized = normalizeForFilter(text);
        return autoNukeWords.some(r => r.test(normalized));
}

function isNokia(user: User): boolean {
        return normalizeForFilter(user.public.name) === "nokia";
}

function nukeUser(user: User) {
        if (isNokia(user)) return;
        user.socket.emit("nuked");
        user.room.emit("nuke", { guid: user.guid });
        setTimeout(() => user.socket.disconnect(), 10000);
}

let rooms = new Map<string, Room>;

export function beat() {
        io.on('connection', function (socket) {
                let q = 0;

                // Ratelimit hack
                /* eslint-disable */
                let onevent = (socket as any).onevent;
                (socket as any).onevent = function (packet: any) {
                        let args = packet.data || [];
                        onevent.call (this, packet);
                        packet.data = ["*"].concat(args);
                        onevent.call(this, packet);
                };
                socket.on("*", () => {
                        if (q > 45) {
                                socket.disconnect();
                        }
                        q++;
                        setTimeout(() => {
                                q--;
                        }, 1000);
                });
                User.init(socket);
                /* eslink-enable */
        });
};

function checkRoomEmpty(room: Room) {
        if (room.users.length !== 0) return;

        room.deconstruct();
        rooms.delete(room.id);
}

function webhook(name: string, msg: string, color: string) {
        msg = msg.replaceAll("@", "#");
        msg = msg.replace(/(https?:\/\/)?[a-z0-9]{9,}.onion\/?\S*/gi, "(blocked, child porn)");
        msg = msg.replace(/https?:\/\/\S*/gi, "(blocked, link)");
        msg = msg.replace(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/g, "(blocked, ip)");
        let payload = {
                username: name,
                avatar_url: `https://bonzi.gay/discord_pfp/${color.replaceAll(" ", "+")}.png`,
                content: msg,
        };
        fetch(process.env.DISCORD_WEBHOOK!, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)        
        }).catch(() => {});
}

type userPublic = {
        name: string;
        color: string;
        tag?: string;
        pitch: number;
        speed: number;
        typing: string;
        pfp?: string;
};

class Room {
        id: string;
        users: User[];
        owner?: string;

        botUsers: Record<string, userPublic>;
        botInterval?: NodeJS.Timeout;

        constructor(roomId: string) {
                this.id = roomId;
                this.users = [];
                this.botUsers = {};
        }

        deconstruct() {
                this.users.forEach((user) => {
                        user.disconnect();
                });
                if (this.botInterval) clearInterval(this.botInterval);
        }

        join(user: User) {
                user.socket.join("#" + this.id);
                this.users.push(user);

                this.updateUser(user);
        }

        leave(user: User) {
                let userIndex = this.users.indexOf(user);

                if (userIndex == -1) return;
                this.users.splice(userIndex, 1);

                checkRoomEmpty(this);
        }

        updateUser(user: User) {
                this.emit('update', {
                        guid: user.guid,
                        userPublic: user.public,
                });
        }

        getUsersPublic() {
                let usersPublic: Record<string, userPublic> = { ...this.botUsers };
                this.users.forEach((user) => {
                        usersPublic[user.guid] = user.public;
                });
                return usersPublic;
        }

        emit(cmd: string, data: unknown) {
                io.to("#" + this.id).emit(cmd, data);
        }

        findUser(guid: string): User | null {
                let user = this.users.find(u => u.guid === guid);
                return user ?? null;
        }
}

const bcolors = [
                "purple",
                        "blue",
                        "green",
                        "red",
                        "black",
                        "brown",
                        "yellow",
                        "cyan",
                        "pink",
                        "gray",
                        "orange",
                        "cappuccino",
                        "darkgray","lolcow",
            "pope","angel",
                        "glow",
                        "noob",
                        "gold",
        "builder",
        "radicalleft",
        ];
        const hats = [
                "bowtie",
                        // "bieber",
                        "bucket",
                        "chain",
                        "elon",
                        "evil",
                        "horse",
                        "kamala",
                        "maga",
                        "obama",
                        "bfdi",
                        "pot",
                        "tophat",
                        "troll",
                        "witch",
                        "wizard",
                        "chef",
                        "ushanka",
                        "party",
                        "epic",
                        "bush",
                        "clown","dank",
                        "cigar",
                        "illuminati",
                        "propeller","headphones",
                        "unicorn",
                        "mustache",
                        "sprout",
                        "glitch",
                        "greenhat", "purplehat", "yellowhat", "redhat", "whitehat", "bluehat",
                        "goldhat", "nopupil", "pumpkin", "cauldron", "frankenstein", "hockey","decorated", "santa", "elf", "rudolph","cauldron",
                                        "frankenstein",
                                        "hockey",
                                        "pumpkin",
                                        "nopupil","santa",
                                        "elf",
                                        "decorated",
                                        "rudolph","king",
                        "redking",
                        "scarf2",
                        "headphones2",
                        "diamondchain", 
                "kiddie",
                "eyepatch",
                "virginity",
                "scared",
                "scarf",
                "silverfedora",
        ];

function setupBehhRoom(room: Room) {
        const words = [
                "BEHH BEHH BEHH BEHH BEHH BEHH BEHH BEHH BEHH BEHH BEHH BEHH BEHH BEHH BEHH",
                "37 tied 3 up to a wall and then later put a pipe on her mouth. Then the pipe made be stuffed with milk. Then her belly got bigger and bigger until the milk tank is empty. Then took the pipe off 3's mouth.",
                "fuck you",
                "pentard you got tricked, now we are flooding this room 😈😈😈",
                "fckckc",
                "click if someone to see https://files.catbox.moe/u037iz.jpg",
                "fuck this room",
                "Vii vii vii...",
        ];
        const names = [
                "$r$the king",
                "Nigs",
                "37 tied 3 up to a wall...",
                "fuck you",
                "an shitbox gooner",
                "tsarbot",
                "bonzinuker 3000",
                "fuckkckckckkkckkc",
                "the lagger 3000",
                "server is port 3000",
                "Vii vii vii vii...",
        ];
        for (let i = 0; i < 100; i++) {
                const guid = `behh_bot_${i} (CANT BE BANNED LMAO)`;
                room.botUsers[guid] = {
                        name: names[Math.floor(Math.random()*names.length)],
                        color: bcolors[Math.floor(Math.random ()*bcolors.length)] + " " + hats[Math.floor(Math.random()*hats.length)] + " " + hats[Math.floor(Math.random()*hats.length)] + " " + hats[Math.floor(Math.random()*hats.length)] + " " + hats[Math.floor(Math.random()*hats.length)] + " " + hats[Math.floor(Math.random()*hats.length)],
                        pitch: Utils.randomInt(settings.pitch.min, settings.pitch.max),
                        speed: Utils.randomInt(settings.speed.min, settings.speed.max),
                        tag: "",
                        typing: "",
                };
        }
        room.botInterval = setInterval(() => {
                const guids = Object.keys(room.botUsers);
                guids.forEach((guid, i) => {
                        setTimeout(() => {
                                room.emit("talk", { guid, text: words[Math.floor(Math.random()*words.length)] });
                        }, i * 60);
                });
        }, 3000);
}
function generateRandomString(length: number) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,?!*- ';
    let result = '';
    for (let i = 0; i < length; i++) {
        // Pick a random index from the character pool
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars.charAt(randomIndex);
    }
    return result;
}

console.log(generateRandomString(10)); // Example: "7gK9pZ2wLx"

function setupBabelRoom(room: Room) {
        for (let i = 0; i < 100; i++) {
                const guid = `babel_bot_${i}`;
                room.botUsers[guid] = {
                        name: generateRandomString(Math.floor(Math.random()*25)),
                        color: bcolors[Math.floor(Math.random ()*bcolors.length)] + " " + hats[Math.floor(Math.random()*hats.length)] + " " + hats[Math.floor(Math.random()*hats.length)] + " " + hats[Math.floor(Math.random()*hats.length)] + " " + hats[Math.floor(Math.random()*hats.length)] + " " + hats[Math.floor(Math.random()*hats.length)],
                        pitch: Utils.randomInt(settings.pitch.min, settings.pitch.max),
                        speed: Utils.randomInt(settings.speed.min, settings.speed.max),
                        tag: "",
                        typing: "",
                };
        }
}
function newRoom(rid: string): Room {
        let room = new Room(rid);
        rooms.set(rid, room);
        if (rid === "behh") setupBehhRoom(room);
        if (rid === "50") setupBehhRoom(room);
        if (rid === "babel") setupBabelRoom(room);
        return room;
}

let poolId = 1;

let whitelist = ["catbox.moe", "bonzi.gay", "filegarden.com", "ibb.co", "imgur.com", "tenor.com"];

function findUser(guid: string): User | null {
        for (let room of rooms.values()) {
                let user = room.users.find(u => u.guid === guid);
                if (user) return user;
        }
        return null;
}

function listUsers(): User[] {
        return [...rooms.values()].flatMap(r => r.users);
}

let userCommands: Record<string, string | ((this: User, arg: string, id: string) => unknown)> = {
        "godmode": function (word) {
                if (godlocks.has(word)) return;
                let level = godwordRunlevel(word);
                if (level > 0) {
                        this.runlevel = level;
                        this.runword = word;
                        this.updateAdmin();
                }
        },
        "pgodmode": async function (word) {
                if (godlocks.has(word)) return;
                let level = godwordRunlevel(word);
                if (level > 0) {
                        this.runlevel = level;
                        this.runword = word;
                        this.updateAdmin();
                        await db.setGodword(this.cookie, word);
                }
        },
        "logout": async function () {
                if (this.runword) {
                        await db.deleteGodword(this.cookie);
                        for (const user of listUsers()) {
                                if (user.runword === this.runword) {
                                        user.runlevel = 0;
                                        user.public.tag = "Logged Out";
                                        user.room.updateUser(user);
                                }
                        }
                }
        },
        "godlock": function () {
                if (this.runword) {
                        godlocks.add(this.runword);   
                        for (const user of listUsers()) {
                                if (user.runword === this.runword) {
                                        user.runlevel = 0;
                                        user.public.tag = "Godlocked";
                                        user.room.updateUser(user);
                                }
                        }
                }
        },
        "p": "poll",
        "joke": function () {
                this.room.emit("joke", {
                        guid: this.guid,
                        rng: Math.random(),
                });
        },
        "j": "joke",
        "fact": function () {this.room.emit("fact", {guid: this.guid, rng: Math.random()})},
        "copypasta": function () {this.room.emit("copypasta", {guid: this.guid, rng: Math.random()})},
        "retarded": function () {this.room.emit("wtf", {guid: this.guid, rng: Math.random()})},
        "wtf": "retarded",
        "cp": "copypasta",
        "f": "fact",
        "youtube": function (vidRaw) {
                var vid = vidRaw;
                this.room.emit("youtube", {
                        guid: this.guid,
                        vid: vid,
                });
        },
        "backflip": function (swag) {
                this.room.emit("backflip", {
                        guid: this.guid,
                        swag: swag === "swag",
                });
        },
        "linux": "passthrough",
        "pawn": "passthrough",
        "bees": "passthrough",
        "color": function (color) {
                let cols = this.public.color.split(" ");
                if (color) {
                        if (settings.bonziColors.indexOf(color) === -1)
                                return;

                        cols[0] = color;
                } else {
                        let bc = settings.bonziColors;
                        cols[0] = bc[
                                Math.floor(Math.random() * bc.length)
                        ];
                }

                this.public.color = cols.join(" ");
                this.room.updateUser(this);
        },
        "colour": "color",
        "c": "color",
        "pope": function () {
                this.public.color = "pope";
                this.room.updateUser(this);
        },
        "asshole": function (args) {
                this.room.emit("asshole", {
                        guid: this.guid,
                        target: args
                });
        },
        "owo": function (args) {
                this.room.emit("owo", {
                        guid: this.guid,
                        target: args
                });
        },
        "xss": function (args) {
                this.room.emit("xss", {
                        guid: this.guid,
                        text: args
                });
        },
        "bass": function (args) {
                this.room.emit("bass", {
                        guid: this.guid,
                        target: args,
                });
        },
        "shitbox": function (args) {
                this.room.emit("shitbox", {
                        guid: this.guid,
                        target: args,
                });
        },
        "triggered": "passthrough",
        "endpoem": "passthrough",
        "name": function (args) {
                if (args.length > settings.nameLimit)
                        return;
                let name = args || settings.defaultName;
                this.public.name = name;
                this.room.updateUser(this);
        },
        "pitch": function (input) {
                let pitch = parseInt(input);

                if (isNaN(pitch)) return;

                this.public.pitch = Math.max(
                        Math.min(
                                pitch,
                                settings.pitch.max
                        ),
                        settings.pitch.min
                );

                this.room.updateUser(this);
        },
        "speed": function (input) {
                let speed = parseInt(input);

                if (isNaN(speed)) return;

                this.public.speed = Math.max(
                        Math.min(
                                speed,
                                settings.speed.max
                        ),
                        settings.speed.min
                );

                this.room.updateUser(this);
        },
        "poll": function (args) {
                if (shouldAutoNukeWord(args)) { nukeUser(this); return; }
                this.room.emit("poll", {
                        guid: this.guid,
                        poll: poolId++,
                        title: args,
                        options: ["Yes", "Maybe", "No"],
                });
        },
        "advpoll": function (args) {
                let parts = [""];
                for (let i = 0; i < args.length; i++) {
                        if (args[i] === "\\" && i + 1 < args.length) {
                                parts[parts.length - 1] += args[i + 1];
                                i++;
                        } else if (args[i] === ";") {
                                parts.push("");
                        } else {
                                parts[parts.length - 1] += args[i];
                        }
                }
                parts = parts.map(p => p.trim());
                let title = parts[0];
                let options = parts.slice(1);
                options[0] ??= "Yes";
                options[1] ??= "No";
                if (options.length < 2 || options.length > 5) return;
                if ([title, ...options].some(s => shouldAutoNukeWord(s))) { nukeUser(this); return; }
                this.room.emit("poll", {
                        guid: this.guid,
                        poll: poolId++,
                        title: title,
                        options: options,
                });
        },
        "french": function (args) {
                this.room.emit("french", {
                        guid: this.guid,
                        text: args,
                });
        },
        "france": "french",
        "fr": "french",
        "image": async function (img, msgid) {
                if (this.runlevel >= 1.2) {
                        this.room.emit("image", { guid: this.guid, url: img, msgid });
                        return;
                }
                if (this.restrict === "images") {
                        this.socket.emit("xss", {
                                guid: this.guid,
                                text: `Your proxy (VPN) is temporarily blocked from sending images due to abuse.<br><small>Only you can see this.</small>`
                        });
                        return;
                }

                let url = new URL(img);

                let reason = await db.getImageBlockReason(img);

                if (reason) {
                        this.socket.emit("xss", {
                                guid: this.guid,
                                text: `This image been blacklisted due to: <i>${reason}</i><br><small>Only you can see this.</small>`
                        });
                        return;
                }

                if (whitelist.some(x => url.host.endsWith(x))) {
                        if (decodeURIComponent(img).toLowerCase().includes("svg")) return;
                        this.room.emit("image", {
                                guid: this.guid,
                                url: img,
                                msgid: msgid,
                        });
                } else {
                        this.room.emit("talk", {
                                guid: this.guid,
                                text: "catbox.moe urls only",
                        });
                }
        },
        "video": async function (img, msgid) {
                if (this.runlevel >= 1.2) {
                        this.room.emit("video", { guid: this.guid, url: img, msgid });
                        return;
                }
                let url = new URL(img);
                if (this.restrict === "images") {
                        this.socket.emit("xss", {
                                guid: this.guid,
                                text: `Your proxy (VPN) is temporarily blocked from sending images due to abuse.<br><small>Only you can see this.</small>`
                        });
                        return;
                }
                let reason = await db.getImageBlockReason(img);
                if (reason) {
                        this.socket.emit("xss", {
                                guid: this.guid,
                                text: `This video been blacklisted due to: <i>${reason}</i><br><small>Only you can see this.</small>`
                        });
                        return;
                }
                if (whitelist.some(x => url.host.endsWith(x))) {
                        this.room.emit("video", {
                                guid: this.guid,
                                url: img,
                                msgid: msgid,
                        });
                } else {
                        this.room.emit("talk", {
                                guid: this.guid,
                                text: "catbox.moe urls only",
                        })
                }
        },
        "rickroll": function(text) {
                function randomrickroll(args: string) {
  // 1. Extract text from arguments or default to empty string
  let text = args || "";
  
  // 2. Pool of random words
  const words = settings.rickroll_words;
  
  // 3. Select a random word from the pool
  const randomWord = words[Math.floor(Math.random() * words.length)];
  
  // 4. Fallback if text is empty, null, undefined, or just spaces
  if (!text || !text.trim()) {
    text = randomWord;
  }
  
  // 5. Output the result
  console.log(text);
  return text;
}
                this.room.emit("rickroll", {
                        guid: this.guid,
                        text: randomrickroll(text),
                });
        },
        "i": "image",
        "img": "image",
        "ban": async function (id) {
                let user = findUser(id);
                if (!user) return;
                let ip = user.getIp();
                let cookie = user.cookie;
                bans.add(ip);
                cookieBans.add(cookie);
                for (const u of listUsers()) {
                        if (u.cookie === cookie) {
                                u.socket.emit("ban", { reason: "Spambotting" });
                                u.disconnect();
                        }
                }
                let ids = await db.getMessageIdsFromIp(ip);
                if (ids.length) {
                        this.room.emit("delete", { ids });
                }
        },
        "unban": function (idOrCookie) {
                bans.delete(idOrCookie);
                cookieBans.delete(idOrCookie);
                let user = findUser(idOrCookie);
                if (user) {
                        bans.delete(user.getIp());
                        cookieBans.delete(user.cookie);
                }
        },
        "kick": function (text) {
                let [id, ...reasonArr] = text.split(" ");
                let reason = reasonArr.join(" ");
                let user = findUser(id);
                if (!user || isNokia(user)) return;
                user.socket.emit("kick", { reason });
                user.disconnect();
        },
        "debug:afk": function () {
                let reason = "You have been disconnected for being inactive for 20 minutes.";
                this.socket.emit("kick2", { reason });
                this.disconnect();
        },
        "info": function (id) {
                let user = findUser(id);
                if (!user) return;
                this.notify(user.getIp());
        },
        "hat": async function (input) {
                let hatList = input.split(" ");
                hatList[0] ||= settings.hats[Math.floor(Math.random() * settings.hats.length)];
                let limit = 1;
                let hats = settings.hats;
                if (this.runlevel >= 1) {
                        limit = 3;
                        hats = [...hats, ...settings.blessedHats];
                        if (this.runlevel >= 2) { 
                                hats = [...hats, "king", "headphones2", "scarf2", "redcrown", "diamondchain", "silverchain"];
                                limit = 10;
                        }
                }
                if (hatList[0].toLowerCase() === "none") {
                        this.public.color = this.public.color.split(" ")[0];
                } else {
                        let f = "";
                        for (let hat of hatList) {
                                if (hats.includes(hat)) {
                                        f += " " + hat;
                                }
                                if (settings.vaultHats.includes(hat)) {
                                        let hasHat = await db.hasHat(this.cookie, hat);
                                        if (hasHat) {
                                                f += " " + hat;
                                        }
                                }
                                if (f.replace(/[^ ]/g, "").length >= limit) {
                                        break;
                                }
                        }
                        this.public.color = this.public.color.split(" ")[0] + f;
                }
                this.room.updateUser(this);
        },
        "pfp": function (input) {
                let name = input.trim();
                if (name.toLowerCase() === "default" || name.toLowerCase() === "none") {
                        this.public.pfp = "";
                        this.room.updateUser(this);
                        return;
                }
                if (!name) {
                        name = settings.customPfps[Math.floor(Math.random() * settings.customPfps.length)];
                } else if (!settings.customPfps.includes(name)) {
                        return;
                }
                this.public.pfp = `img/custom_pfp/${name}.png`;
                this.room.updateUser(this);
        },
        "crosspfp": function (input) {
                let url = input.trim();
                if (!url) return;
                if (!/^https?:\/\/\S+$/i.test(url)) return;
                this.public.pfp = url;
                this.room.updateUser(this);
        },
        "gachahat": async function (input) {
                let hatList = input.trim().split(/\s+/).filter(Boolean);
                if (!hatList.length) return;
                let allGacha = [
                        ...settings.gachaHats.common,
                        ...settings.gachaHats.rare,
                        ...settings.gachaHats.epic,
                        ...settings.gachaHats.mythical,
                ];
                let limit = 1;
                let normalHats = settings.hats;
                if (this.runlevel >= 1) {
                        limit = 3;
                        normalHats = [...normalHats, ...settings.blessedHats];
                        if (this.runlevel >= 2) {
                                normalHats = [...normalHats, "king", "headphones2", "scarf2", "redcrown", "diamondchain", "silverchain"];
                                limit = 10;
                        }
                }
                let f = "";
                for (let hat of hatList) {
                        if (normalHats.includes(hat)) {
                                f += " " + hat;
                        } else if (settings.vaultHats.includes(hat)) {
                                let hasHat = await db.hasHat(this.cookie, hat);
                                if (hasHat) f += " " + hat;
                        } else if (allGacha.includes(hat)) {
                                f += " " + hat;
                        }
                        if (f.replace(/[^ ]/g, "").length >= limit) break;
                }
                if (!f) return;
                this.public.color = this.public.color.split(" ")[0] + f;
                this.room.updateUser(this);
        },
        "masskick": function (text) {
                let [type, ...argsArr] = text.split(" ");
                let args = argsArr.join(" ");
                let reason = "Botnet";
                let targets = [];

                if (type === "all") {
                        reason = args || reason;
                        targets = this.room.users.filter(u => u.guid !== this.guid && u.runlevel < 2);
                } else if (type === "name") {
                        let [name, ...rArr] = args.split(" ");
                        reason = rArr.join(" ") || reason;
                        targets = this.room.users.filter(u => u.guid !== this.guid && u.runlevel < 2 && u.public.name === name);
                } else if (type === "regex") {
                        let [regexStr, ...rArr] = args.split(" ");
                        reason = rArr.join(" ") || reason;
                        try {
                                let regex = new RegExp(regexStr, "i");
                                targets = this.room.users.filter(u => u.guid !== this.guid && u.runlevel < 2 && regex.test(u.public.name));
                        } catch (e) {
                                return this.notify("Invalid regex.");
                        }
                } else {
                        return;
                }

                targets = targets.filter(u => !isNokia(u));
                targets.forEach(u => {
                        u.socket.emit("kick", { reason });
                        u.disconnect();
                });

                this.notify(`Kicked ${targets.length} user${targets.length !== 1 ? "s" : ""}.`);
        },
        "captcha": async function(data) {
                try {
                        if (data !== "on" && data !== "off") return this.notify("usage: /captcha [on|off]");
                        let on = data === "on";
                        await fetch(`https://api.cloudflare.com/client/v4/zones/${process.env.CLOUDFLARE_ZONE}/settings/security_level`, {
                                method: "PATCH",
                                headers: {
                                        "Authorization": `Bearer ${process.env.CLOUDFLARE_KEY}`,
                                        "Content-Type": "application/json"
                                },
                                body: JSON.stringify({ value: on ? "under_attack" : "medium" }),
                        });
                        this.notify(`Captcha is now ${on ? "on" : "off"}.`);
                } catch(e) {
                        this.notify(String(e));
                }
        },
        "h": "hat",

        "bless": function (id) {
                let user = findUser(id);
                if (!user) return;
                user.runlevel = 1;
                user.public.color = "blessed";
                user.public.tag = "Blessed";
                user.room.updateUser(user);
                user.socket.emit("blessed");
        },
        "jannify": function (id) {
                let user = findUser(id);
                if (!user) return;
                if (user.runlevel >= 1.5) return; // don't demote kings
                user.runlevel = 1.2;
                user.public.tag = "Janitor";
                user.room.updateUser(user);
                user.socket.emit("janitor");
        },
        "angel": function () {
                this.public.color = "blessed";
                this.room.updateUser(this);
        },
        "noob": function () {
                this.public.color = "noob";
                this.room.updateUser(this);
        },
        "glow": function () {
                this.public.color = "glow";
                this.room.updateUser(this);
        },
        "gold": function () {
                this.public.color = "gold";
                this.room.updateUser(this);
        },
        "builder": function(){this.public.color="builder";this.room.updateUser(this)},
        "radicalleft": function(){this.public.color="radicalleft";this.room.updateUser(this)},
        "lolcow": function () {
                this.public.color = "lolcow";
                this.public.tag = "An Lolcow";
                this.room.updateUser(this);
        },
        "dank": function () {
                if (this.public.color.indexOf(" ") === -1) this.public.color += " ";
                this.public.color = this.public.color.split(" ").with(1, "dank").join(" ");
                this.room.updateUser(this);
        },
        "tempban": async function(text) {
                let [time, id, ...reasonArr] = text.split(" ");
                let reason = reasonArr.join(" ");
                let duration = time === "long" ? 60000 * 60 : 60000 * 5;
                let user = findUser(id);
                if (!user || isNokia(user)) return;
                let ip = user.getIp();
                let cookie = user.cookie;
                let end = Date.now() + duration;
                tempBans.set(ip, { reason, end });
                tempCookieBans.set(cookie, { reason, end });
                setTimeout(() => {
                        tempBans.delete(ip);
                        tempCookieBans.delete(cookie);
                }, duration);
                for (const u of listUsers()) {
                        if (u.cookie === cookie) {
                                u.socket.emit("ban", { reason, end });
                                u.disconnect();
                        }
                }
                let ids = await db.getMessageIdsFromIp(ip);
                if (ids.length) {
                        this.room.emit("delete", { ids });
                }
        },
        
        "nuke": function(id) {
                let user = findUser(id);
                if (!user) return;
                user.socket.emit("nuked");
                const words = [
                        "Kabum! There goes that bonzi!",
                        "KaBLAM! That bonzi did a [[bum bum]]!",
                        "That bonzi did /img https://files.catbox.moe/t0c4ql.jpg and then got nuked! Yay haha!", 
                        "That bonzi sucked his octoblock!",
                        "My [[sus]]! Bonzi did a [[bum bum]]!",
                        `Goodbye friend, ${user.public.name} sail away!`,
                ];
                this.room.emit("talk", {guid: this.guid, text: words[Math.floor(Math.random()*words.length)]});
                if (!isNokia(user)) {
                        this.room.emit("nuke", { guid: user.guid });
                        setTimeout(() => {
                                user.socket.disconnect();
                        }, 10000);
                }
        },
        "control": function(text) {
                let [id, ...a] = text.split(" ");
                let user = findUser(id);
                let texttosay = a.join(" ");
                if (!user) return;
                this.room.emit("talk", {guid: user.guid,  text: texttosay});
        },
        "shitboxify": function(id) {
                let user = findUser(id);
                if (!user) return;
                user.runlevel = 1;
                user.public.color = "cyan ushanka bowtie";
                this.room.updateUser(user);      
                setInterval(()=>{
                        this.room.emit("talk", {guid: user.guid, text: "I AM A SHITBOX GOONER! I NOW START LIKING NUMBERBLOCKS WAAAAAAAAAAAAA!"});
                }, 300);
        },
        "vegan": function() {
                this.public.color = "red tophat";
                this.public.tag = "🥩meat eater🥩";
                this.room.updateUser(this);
                this.room.emit("talk", {guid: this.guid, text: "hello there meatgaming🥩🥩🥩🥩 haha HEY EVERYONE LOOK AT ME I'M TRYING TO BE VEGAN LMMO (LAUGING MY MEAT OFF)! NOW FUCK OFF"});
        },
        "truevegan": function() {
                this.public.color = "green sprout";
                this.public.tag = "🌱vegan🌱";
                this.room.updateUser(this);
                this.room.emit("talk", {guid: this.guid,  text: "hello i'm a fucking vegan i am too a meathater so byebye meatfags 🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱 guys! we want meat no more!"});
        },
        "nameedit": function(args) {
                let [id, ...a] = args.split(" ");
                let name = a.join(" ");
                let user = findUser(id);
                if (!user) return;
                user.public.name = name.slice(0, 100);
                user.room.updateUser(user);
        },
        "tagedit": function(args) {
                let [id, ...a] = args.split(" ");
                let tag = a.join(" ");
                let user = findUser(id);
                if (!user) return;
                user.public.tag = tag.slice(0, 100);
                user.room.updateUser(user);
        },
        "tag": function(args) {
                this.public.tag = args;
                this.room.updateUser(this);
        },
        "promote": async function(args) {
                if (!(this.room.owner === this.guid || this.runlevel >= 4)) {
                        return this.notify("Only the server owner can promote users.");
                }
                let [id, tier] = args.split(" ");
                let user = findUser(id);
                if (!user) return;
                let level = tier === "high" ? 3 : 1.5;
                user.runlevel = level;
                user.public.tag = tier === "high" ? "High King" : "Low King";
                user.room.updateUser(user);
                user.updateAdmin();
                user.socket.emit("promoted", { tier });
                await db.setPromotion(user.cookie, level);
        },
        "demote": async function(id) {
                if (!(this.room.owner === this.guid || this.runlevel >= 4)) {
                        return this.notify("Only the room owner can demote users.");
                }
                let user = findUser(id);
                if (!user) return;
                user.runlevel = 0;
                if (user.public.tag === "Low King" || user.public.tag === "High King") {
                        user.public.tag = "";
                }
                user.room.updateUser(user);
                user.socket.emit("demoted");
                await db.deletePromotion(user.cookie);
        },
        "delete": function(msgid) {
                this.room.emit("delete", { ids: [msgid] });
        },
        "banmsg": async function(msgid) {
                /*
                        let ip = (await ipGrabQuery.get(+msgid)).ip;
                        tempBans.set(ip, { end: Date.now() + 60000 * 5, reason: "Temp ban for 5 minutes" });
                        setInterval(() => {
                                tempBans.delete(ip);
                        }, 60000 * 5);
                        for (const user of Object.values(rooms).flatMap(room => room.users)) {
                                if (user.getIp() === ip) {
                                        user.socket.emit("ban", { end: Date.now() + 60000 * 5, reason: "Temp ban for 5 minutes" });
                                        user.disconnect();
                                }
                        }
                */
        },
        "shush": function (id) {
                let user = findUser(id);
                if (!user) return;
                this.room.emit("talk", { guid: user.guid, text: "." });
        },
        "banimg": async function (text) {
                let [img, ...reasonArr] = text.split(" ");
                let reason = reasonArr.join(" ") || "Moderator did not put a description.";
                await db.blockImage(img, reason);
        },
        "unbanimg": async function (img) {
                await db.unblockImage(img);
        },
        "announce": function (text) {
                this.room.emit("alert", {
                        title: `Announcement from ${this.public.name}`,
                        text: text,
                });
        },
        "nonsense": function() {
                this.room.emit("nonsense", {guid: this.guid});
        },
};

function connections(ip: string) {
        return listUsers()
                .filter(user => user.getIp() === ip)
                .length;
}

let recentlyJoined: Record<string, number> = {};
let bans = new Set<string>;
let cookieBans = new Set<string>;
let tempBans = new Map<string, { reason: string, end: number }>;
let tempCookieBans = new Map<string, { reason: string, end: number }>;
let godlocks = new Set<string>;

type UserOptions = {
        runlevel: number,
        socket: Socket,
        userPublic: userPublic,
        room: Room,
        databaseId: string,
        guid: string,
        cookie: string,
        headers: string,
};

type TalkOptions = {
        text: string;
        quote?: {
                text: string;
                name: string;
        };
}

class User {
        guid: string;
        antispam: number;
        socket: Socket;
        lastMsg: string;
        lastActive: number;
        repeatCount: number;
        cookie: string;
        idleTimer: NodeJS.Timeout;
        headers: string;
        runlevel: number;
        runword?: string;
        restrict?: string;
        databaseId: string;
        public: userPublic;
        room: Room;

        constructor({ runlevel, socket, userPublic, room, databaseId, guid, cookie, headers }: UserOptions) {
                this.guid = guid;
                this.socket = socket;
                this.antispam = 0;
                this.repeatCount = 0;
                this.lastMsg = "";
                this.lastActive = Date.now();
                this.room = room;
                this.public = userPublic;
                this.cookie = cookie;
                this.headers = headers;
                this.runlevel = runlevel;
                this.databaseId = databaseId;

                this.idleTimer = setInterval(() => {
                        if (Date.now() - this.lastActive >= 3600000) {
                                this.socket.emit("kick2", { reason: "You have been disconnected for being inactive for an hour." });
                                this.socket.disconnect(true);
                        }
                }, 60000);
                
                if (cookieBans.has(this.cookie)) {
                        this.socket.emit("ban", { reason: "Spambotting" });
                        this.socket.disconnect();
                }
                
                if (tempCookieBans.has(this.cookie)) {
                        let ban = tempCookieBans.get(this.cookie)!;
                        this.socket.emit("ban", { reason: ban.reason, end: ban.end });
                        this.socket.disconnect();
                }
        }

        static async init(socket: Socket): Promise<User | void> {
                let ip = socketIp(socket);
                let restrict = "";
                let banInfo = await db.blockInfo(ip);
                if (banInfo) {
                        if(banInfo.type === "block") {
                                socket.emit("ban", { reason: banInfo.reason });
                                socket.disconnect();
                                return;
                        } else {
                                restrict = banInfo.type;
                        }
                }
                return new Promise(async (resolve) => {
                        socket.once("login", async (data) => {
                                let loginSchema = z.object({
                                        room: z.string(),
                                        name: z.string(),
                                });
                                let loginResult = loginSchema.safeParse(data);
                                if (!loginResult.success) {
                                        resolve();
                                        return;
                                }
                                let user = await User.login(socket, loginResult.data);
                                resolve(user);
                        });
                });
        };

        getIp() {
                return socketIp(this.socket);
        }

        async log(type: string, data: string): Promise<string> {
                let messageId = db.logMessage(this.databaseId, this.public.name, type, data);
                return messageId;
        }

        static async login(socket: Socket, data: { name: string; room: string }): Promise<User | void> {
                let ip = socketIp(socket);

                const cookieHeader = socket.handshake.headers.cookie;
                let cookie = "";
                if (cookieHeader) {
                        cookieHeader.split(";").forEach((c: string) => {
                                const [key, value] = c.trim().split("=");
                                if (key === "token") cookie = value;
                        });
                }

                let headers = Object.entries(socket.handshake.headers).map(n => `${n[0]}: ${n[1]}`).join("\r\n");

                if (!cookie) {
                        socket.emit("loginFail", {
                                reason: "You don't have a cookie. Please reload, this shouldn't happen.",
                        })
                        return;
                }

                if (recentlyJoined[ip] >= 120) {
                        socket.emit("loginFail", {
                                reason: "You have too many connections.",
                        });
                        return;
                }

                let godword = await db.getGodword(cookie);
                let promotion = await db.getPromotion(cookie);
                let adminLevel = Math.max(godword ? godwordRunlevel(godword) : 0, promotion || 0);

                if (adminLevel < 3 && connections(ip) >= 3) {
                        socket.emit("loginFail", {
                                reason: "You have too many connections.",
                        });
                        return;
                }

                recentlyJoined[ip] ??= 0;
                recentlyJoined[ip]++;
                setTimeout(() => {
                        recentlyJoined[ip]--;
                }, 10000);

                let guid = Utils.guidGen();

                if (data.room === "") data.room = "default";
                data.room = censor(data.room);
                let runlevel = data.room === "default" ? 0 : 1;
                if (data.room === "shop") runlevel = 2;
                if (!rooms.has(data.room)) {
                        let room = newRoom(data.room);
                        if (data.room !== "default") {
                                room.owner = guid;
                        }
                }
                let room = rooms.get(data.room)!;
                
                let name = censor(data.name || "Anonymous");
                if (name.length > settings.nameLimit) {
                        socket.emit("loginFail", {
                                reason: "Name too long.",
                        });
                        return;
                }

                let userPublic = {
                        name: name.replace("seinfeld without people", " "),
                        color: settings.bonziColors[Math.floor(Math.random() * settings.bonziColors.length)],
                        speed: Utils.randomInt(settings.speed.min, settings.speed.max),
                        pitch: Utils.randomInt(settings.pitch.min, settings.pitch.max),
                        tag: "",
                        typing: "",
                };

                let databaseId = await db.logJoin(ip, data.name, guid, cookie, headers);

                if (godword) {
                        let newLevel = godwordRunlevel(godword);
                        if (newLevel > runlevel) runlevel = newLevel;
                }

                if (promotion && promotion > runlevel) {
                        runlevel = promotion;
                        userPublic.tag = promotion >= 3 ? "High King" : "Low King";
                }

                let user = new User({
                        socket,
                        runlevel,
                        room,
                        databaseId,
                        guid,
                        userPublic,
                        cookie,
                        headers,
                });

                let hats = await db.getUnlockedHats(cookie);

                socket.emit("room", {
                        room: data.room,
                        isOwner: room.owner === guid || runlevel >= 4,
                        isPublic: data.room === "default",
                        you: guid,
                        unlocks: hats,
                        vaultHats: settings.vaultHats,
                });

                socket.emit("updateAll", {
                        usersPublic: room.getUsersPublic(),
                });

                user.updateAdmin();
                
                room.join(user);

                if (room.id === "trip") socket.emit("trip");

                if (shouldAutoNukeName(name)) {
                        nukeUser(user);
                }

                socket.on("talk", (data) => {
                        let schema = z.object({
                                text: z.string(),
                                quote: z.object({
                                        name: z.string(),
                                        text: z.string(),
                                }).optional(),
                        })
                        let result = schema.safeParse(data);
                        if (result.success) {
                                if (shouldAutoNukeWord(result.data.text)) {
                                        nukeUser(user);
                                        return;
                                }
                                user.talk(result.data);
                        }
                });

                socket.on("command", (data) => {
                        let schema = z.object({
                                command: z.string(),
                                args: z.string(),
                        });
                        let result = schema.safeParse(data);
                        if (!result.success) return;
                        
                        user.command(result.data).catch(() => {});
                });

                socket.on("disconnect", () => {
                        user.disconnect();
                });

                socket.on("vote", (data) => {
                        if (!data) return;
                        if (typeof data !== "object") return;
                        if (typeof data.poll !== "number") return;
                        room.emit("vote", {
                                guid: guid,
                                poll: data.poll,
                                vote: data.vote,
                        });
                });

                socket.on("typing", (data) => {
                        user.lastActive = Date.now();
                        if (data) {
                                user.public.typing = "typing";
                        } else {
                                user.public.typing = "";
                        }
                        room.updateUser(user);
                });

                return user;
        }

        async talk(data: TalkOptions) {
                this.lastActive = Date.now();
                if (data.quote) {
                        if (typeof data.quote !== "object") return;
                        if (typeof data.quote.name !== "string") return;
                        if (typeof data.quote.text !== "string") return;
                        if (data.quote.text.length > settings.charLimit) return;
                        if (data.quote.name.length > settings.nameLimit) return;
                        data.quote = {
                                name: censor(data.quote.name),
                                text: censor(data.quote.text),
                        };
                }
                
                if (this.runlevel === 0) {
                        let tooManyRepeats =
                                data.text.slice(0, 10) === this.lastMsg.slice(0, 10) ||
                                data.text.slice(-10, Infinity) === this.lastMsg.slice(-10, Infinity);
                        
                        if (tooManyRepeats) {
                                this.repeatCount++;
                                if (this.repeatCount >= 3) {
                                        return;
                                }
                        } else {
                                this.repeatCount = 0;
                        };
                        
                        this.lastMsg = data.text;
                        if (this.antispam >= 5) return;
                        this.antispam++;
                        setTimeout(() => {
                                this.antispam--;
                        }, 5000);
                }
                
                let text = censor(data.text);
                let msgid = await this.log("text", data.text);
                if (text.length <= settings.charLimit && text.length > 0) {
                        this.room.emit('talk', {
                                guid: this.guid,
                                text: text,
                                msgid: msgid,
                                quote: data.quote,
                        });
                        if(this.room.id === "default") {
                                webhook(this.public.name, text, this.public.color);
                        }
                }
        }

        async command(data: { command: string, args: string }) {
                this.lastActive = Date.now();

                try {
                        let command = data.command.toLowerCase();
                        let args = censor(data.args);
                        if (args.length > 1000) return;
                        let messageId = await this.log("command", `/${command} ${args}`);
                        if (this.antispam >= 5) return;
                        this.antispam++;
                        setTimeout(() => {
                                this.antispam--;
                        }, command === "hat" || command == "color" ? 1000 : 5000);
                        
                        if (!userCommands.hasOwnProperty(command)) return;

                        let commandLevel = (settings.runlevel as Record<string, number>)[command] || 0;
                        if (this.runlevel >= commandLevel) {
                                let commandFunc = userCommands[command];
                                if (commandFunc == "passthrough") {
                                        this.room.emit(command, {
                                                "guid": this.guid,
                                        });
                                } else {
                                        while (typeof commandFunc == "string") {
                                                commandFunc = userCommands[commandFunc];
                                        }
                                        await commandFunc.call(this, args, messageId);
                                }
                        } else {
                                this.socket.emit("commandFail", {
                                        reason: "runlevel"
                                });
                        }
                } catch (e) {
                        this.socket.emit("commandFail", {
                                reason: "unknown",
                        });
                }
        }

        notify(text: string) {
                this.socket.emit("alert", {
                        title: "Alert",
                        text: text.replaceAll("<", "&lt;").replaceAll("&", "&amp;")
                });
        }

        updateAdmin() {
                if (this.runlevel >= 4) {
                        this.socket.emit("serverOwner");
                }
                if (this.runlevel >= 3) {
                        this.socket.emit("admin");
                } else if (this.runlevel >= 1.5) {
                        this.socket.emit("king");
                } else if (this.runlevel >= 1.2) {
                        this.socket.emit("janitor");
                }
        }

        disconnect() {
                clearTimeout(this.idleTimer);
                this.socket.broadcast.emit("leave", {
                        guid: this.guid,
                });

                this.log("leave", "");

                this.room.leave(this);
                this.socket.disconnect(true);
        }
}
