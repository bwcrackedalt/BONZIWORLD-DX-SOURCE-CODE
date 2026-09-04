let taskId = 0;
let tasks = new Map();

let ttsWorker = new Worker("./espeakWorker.js", { type: "module" });
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let gainNode = new GainNode(audioCtx, { gain: 1 });
gainNode.connect(audioCtx.destination);

export function setVolume (vol) {
    if (vol === 0) {
        gainNode.gain.value = 0;
    } else {
        gainNode.gain.value = 10 ** ((25 * vol + -25) / 20);
    }
}

function play(text, options = {}, onend = () => {}, onstart = () => {}, signal = { aborted: false }) {
    let id = taskId++;
    text = text.replace(/(.{5,}?)\1{5,}/gi, "$1$1$1$1$1");
    tasks.set(id, { onstart, onend, signal });
    ttsWorker.postMessage({ id, text, options });
}

export let speak = {
    play,
};

ttsWorker.addEventListener("message", async (e) => {
    let { id, wav } = e.data;
    let task = tasks.get(id);
    if (!task) return;
    if(task.signal.aborted) {
        tasks.delete(id);
        return;
    }
    try {
        let buffer = await audioCtx.decodeAudioData(wav.buffer);
        let source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(gainNode);
        if (audioCtx.state === "suspended") await audioCtx.resume();
        source.start();
        task.onstart(source, {});
        source.addEventListener("ended", () => {
            task.onend();
            tasks.delete(id);
        });
    } catch (error) {
        console.error("TTS audio playback failed:", error);
        task.onend();
        tasks.delete(id);
    }
});

ttsWorker.addEventListener("error", (error) => {
    console.error("TTS worker failed:", error);
    for (let [id, task] of tasks) {
        task.onend();
        tasks.delete(id);
    }
});