---
name: Bonzi media-bubble event pattern
description: How the client-side Bonzi speech-bubble system in client/src/script.js handles rich chat content (images, video, polls, audio) as a queued event list, and how to add a new type.
---

The Bonzi class runs a queue (`this.eventList`) drained one item per animation frame in `update()`'s switch statement. Each event type (`text`, `image`, `video`, `poll`, `audio`, `rickroll`, ...) follows the same shape:

- On `eventFrame === 0`, call a `#showX()`/`#playX()` private method that populates `this.bubbleCont.innerHTML` and unhides `this.bubble`.
- Increment `eventFrame` every tick; advance to the next event once `this.bubble.hidden` becomes true (bubble closes itself) or a frame-count timeout is hit as a safety net.
- `cancel()` → `clearDialog()` → `stopSpeaking()` is the single choke point that hides the bubble and tears down any active audio/TTS. Any new "plays sound" event type must hook its cleanup into `stopSpeaking()` so that clicking/touching the bonzi (which calls `cancel()`) stops it.
- Lipsync (`updateLipsync()`) normally drives mouth sprites off TTS phoneme timings (`this.lipTimings`), but for arbitrary audio (no phoneme data) an amplitude-based fallback was added: a Web Audio `AnalyserNode` on the `<audio>` source drives mouth-sprite selection off average frequency data, gated behind `this.audioAnalyser`.
- New chat markdown tags (e.g. `[audio=(url)]`) are parsed once, client-side, at the single `socket.on("talk", ...)` handler — this is the one choke point all incoming chat messages pass through before becoming an event — rather than inside `markup()`/`nmarkup()` (those are for inline text styling, not swapping the whole event type).
- Server-side `censor()` only does word-filter regex replacement on chat text; it does not strip or validate bracket/tag syntax, so new bracket-style markdown tags pass through untouched and need no server change unless URL validation/blocking is desired.
