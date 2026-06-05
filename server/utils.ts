import type { NextFunction, Request, Response } from "express";

// GUID generator (okay not actually GUID compliant but whatever)
// http://stackoverflow.com/a/105074
export function guidGen(): string {
        function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
        };

        let id = '';
        for (let i = 0; i < 4; i++)
                id += s4();
        return id;
}


// http://stackoverflow.com/a/1527820
export function randomInt(min: number, max: number): number {
        return Math.floor(((max - min + 1) * Math.random()) + min);
};

// Homoglyph map: maps lookalike chars to their ASCII equivalents
const HOMOGLYPHS: Record<string, string> = {
        // Latin fullwidth
        ...Object.fromEntries("ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ".split("").map((c, i) => [c, String.fromCharCode(97 + i)])),
        ...Object.fromEntries("ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ".split("").map((c, i) => [c, String.fromCharCode(65 + i)])),
        ...Object.fromEntries("０１２３４５６７８９".split("").map((c, i) => [c, String(i)])),
        // Circled letters
        ...Object.fromEntries("ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ".split("").map((c, i) => [c, String.fromCharCode(97 + i)])),
        ...Object.fromEntries("ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ".split("").map((c, i) => [c, String.fromCharCode(65 + i)])),
        // Mathematical bold/italic/script variants (covers most Unicode math blocks)
        ...Object.fromEntries("𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳".split("").map((c, i) => [c, String.fromCharCode(97 + i)])),
        ...Object.fromEntries("𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙".split("").map((c, i) => [c, String.fromCharCode(65 + i)])),
        // Cyrillic/Greek lookalikes
        "а": "a", "е": "e", "о": "o", "р": "p", "с": "c", "х": "x",
        "А": "A", "В": "B", "Е": "E", "К": "K", "М": "M", "Н": "H",
        "О": "O", "Р": "P", "С": "C", "Т": "T", "Х": "X",
        "α": "a", "β": "b", "ε": "e", "ο": "o", "ρ": "p", "τ": "t",
        // Leet / common substitutions
        "0": "o", "1": "i", "3": "e", "4": "a", "5": "s", "7": "t", "@": "a", "$": "s", "!": "i",
        // Other common homoglyphs
        "ı": "i", "ℓ": "l", "℮": "e", "℃": "c",
};

// Zero-width and invisible characters to strip
const INVISIBLE_RE = /[\u0000-\u001F\u007F\u00AD\u034F\u061C\u115F\u1160\u17B4\u17B5\u180B-\u180D\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\u3164\uFEFF\uFFA0]/g;

export function normalizeForFilter(str: string): string {
        // 1. NFKD decomposition (ａ→a+combining, ① → 1, ﬁ → fi, etc.)
        let out = str.normalize("NFKD");
        // 2. Strip combining diacritics (accents, etc.)
        out = out.replace(/\p{M}/gu, "");
        // 3. Strip invisible/zero-width chars
        out = out.replace(INVISIBLE_RE, "");
        // 4. Map remaining homoglyphs
        out = [...out].map(c => HOMOGLYPHS[c] ?? c).join("");
        return out.toLowerCase();
}

export function sanitizeUnicode(str: string) {
        if (!str) return str;
        const REPLACEMENT = "\uFFFD";
        let out = "";

        for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);
        
        if (code === 0) {
                out += REPLACEMENT;
                continue;
        }

        if (code >= 0xD800 && code <= 0xDBFF) {
                const next = str.charCodeAt(i + 1);
                if (!(next >= 0xDC00 && next <= 0xDFFF)) {
                        out += REPLACEMENT;
                } else {
                        out += str[i] + str[i + 1];
                        i++;
                }
                continue;
        }

        if (code >= 0xDC00 && code <= 0xDFFF) {
                out += REPLACEMENT;
                continue;
        }

        out += str[i];
        }
        
        return out;
}

declare module "express-serve-static-core" {
        interface Request {
                // can't overwrite "cookies" because express.js declares it as "any"
                // mild hack but its fine we won't be using express forever
                cookie: Record<string, string | undefined>;
        }
}

export function cookieParser(req: Request, res: Response, next: NextFunction) {
        if (!req.headers.cookie) {
                req.cookie = {};
                next();
                return;
        }
        let cookie = req.headers.cookie;
        let cookies: Record<string, string> = {};
        let keypairs = cookie.split("; ");
        for (let keypair of keypairs) {
                let equalPos = keypair.indexOf("=");
                let key = keypair.slice(0, equalPos);
                let val = decodeURIComponent(keypair.slice(equalPos + 1));
                cookies[key] = val;
        }
        req.cookie = cookies;
        next();
}