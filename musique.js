const backgroundMusic = new Audio("image/1950s stormy night ambience 🌧️ cozy grandma’s cottage with oldies playing in another room for sleep.mp3");
const musicPositionKey = "ekin-background-music-position";
let positionRestored = false;
let pausedForFolder = false;

backgroundMusic.loop = true;
backgroundMusic.preload = "auto";

function restorePosition() {
  if (positionRestored || !Number.isFinite(backgroundMusic.duration)) return;

  const savedPosition = Number(localStorage.getItem(musicPositionKey) || 0);
  if (savedPosition < backgroundMusic.duration) {
    backgroundMusic.currentTime = savedPosition;
  }
  positionRestored = true;
}

function savePosition() {
  if (Number.isFinite(backgroundMusic.currentTime)) {
    localStorage.setItem(musicPositionKey, String(backgroundMusic.currentTime));
  }
}

function startBackgroundMusic() {
  if (pausedForFolder) return;

  restorePosition();
  backgroundMusic.play().catch(() => {});
}

function pauseBackgroundMusic() {
  pausedForFolder = true;
  savePosition();
  backgroundMusic.pause();
}

backgroundMusic.addEventListener("loadedmetadata", startBackgroundMusic);
backgroundMusic.addEventListener("timeupdate", savePosition);
window.addEventListener("pagehide", savePosition);
window.addEventListener("pointerdown", startBackgroundMusic);
window.addEventListener("keydown", startBackgroundMusic);

window.pauseBackgroundMusic = pauseBackgroundMusic;
startBackgroundMusic();