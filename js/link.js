let isPlaying = false;
const audio = new Audio('../misc/mambo.mp3'); 


function togglePulse() {  
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
  isPlaying = !isPlaying;
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