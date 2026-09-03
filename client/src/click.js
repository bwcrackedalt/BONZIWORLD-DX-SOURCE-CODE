// Pre-load the audio file
const clickSound = new Audio("https://files.catbox.moe/rhm83i.mp3");

// Listen for clicks anywhere on the page
document.addEventListener("click", () => {
  clickSound.play();
});