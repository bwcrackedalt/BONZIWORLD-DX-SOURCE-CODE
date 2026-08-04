const bots = io();
        bots.emit("client", "MAIN");
        bots.emit("login", {
            name: "false info bot",
            room: "",
        });
function cmd(str) {
	let [command, ...args] = str.split(" ");
    bots.emit("command", {
		command,
		args: args.join(" "),
	});
}
const intros = [
    "ALERT:",
    "PSA:",
    "BREAKING NEWS:",
    "^^⚠️WARNING^^\\n"
];
const texts = [
    "STICKY WILL PLAN ON COMING BACK TO BONZIWORLD IN THE FUTURE. A DISCORD MESSAGE WILL BE SEND OUT WHEN HE DOES.",
    "ARDAKIRAC2009 IS BACK! HE SAID THAT HE WILL COMEING BACK TO BONZIWORLD, NO MORE SUFFERING!",
    "ERIK WILL RELEASE 1.6.7 WILL PRODUCE BONZIWORLD PROMOTING ADS, AN APP ON THE PLAY STORE, AND MORE!",
    "/YOUTUBE IS BACK! YOU CAN NOW WATCH YOUTUBE VIDEOS ON BONZIWORLD WITH LIPSYNC!",
    "NEW HATS: neathey bwkr radical sticky bluebluehat goldfedora",
    "AN SERVER NAMED ",
];
        setTimeout(() => {
            cmd('hat');
        bots.emit("talk", {
            text: `${intros[Math.floor(Math.random()*intros.length)]} ${texts[Math.floor(Math.random()*texts.length)]}`
        })
        },1000);
setTimeout(()=>{
    bots.disconnect();
}, 3500);