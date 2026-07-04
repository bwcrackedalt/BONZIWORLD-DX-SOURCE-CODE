// 1. List your audio source URLs in an array
const playlist = [
  "https://files.catbox.moe/x4d8qh.mp4",
  "https://files.catbox.moe/w01de2.mp3",
];

// 2. Instantiate a native JavaScript Audio object
const audioPlayer = new Audio();

// 3. Define the function to pick and play a random track
function playRandomTrack() {
  // Select a random index based on the playlist length
  const randomIndex = Math.floor(Math.random() * playlist.length);
  
  // Set the source, properties of the audio player to the chosen track URL
  audioPlayer.src = playlist[randomIndex];
  audioPlayer.volume = 0.4;
  // Start audio playback
  audioPlayer.play()
    .catch(error => console.log("Playback failed or interrupted:", error));
}

// 4. Listen for the 'ended' event to automatically cue the next random song
audioPlayer.addEventListener("ended", () => {
  console.log("Track finished. Choosing another random track...");
  playRandomTrack();
});