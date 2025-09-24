const audio = new Audio('misc/mambo.mp3');
audio.loop = false;
function togglePulse() {
  if (!audio.paused && !audio.ended && audio.currentTime > 0) {
    audio.pause();
    audio.currentTime = 0;
  } else {
    audio.play();
  }
}


document.getElementById("ytb-btn").addEventListener("click", () => {
  window.location.href = "https://www.youtube.com/watch?v=WSKndOdzKN0";
});

document.getElementById("gtb-btn").addEventListener("click", () => {
  window.location.href = "https://github.com/KurtVelasco";
});

document.getElementById("mambo-btn").addEventListener("click", () => {
  togglePulse();    
});
document.getElementById("rando-btn").addEventListener("click", () => {
  randomizeCards();   
});