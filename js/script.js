let prefixes = [];
let suffixes = [];
let soloNames = [];
const tagOptions = ["Late", "Pace", "End", "Front"];
const gradientOptions = [
  ["#a1ffc7", "#abffcd"], 
  ["#ffa1b1", "#ffb07f"], 
  ["#a1d4ff", "#b0e0ff"], 
  ["#d7a1ff", "#e0abff"], 
];

async function loadWordLists() {
  const [prefixRes, suffixRes, soloRes] = await Promise.all([
    fetch("text/prefix.txt"),
    fetch("text/suffix.txt"),
    fetch("text/word.txt")
  ]);

  prefixes = (await prefixRes.text()).split(",").map(x => x.trim()).filter(Boolean);
  suffixes = (await suffixRes.text()).split(",").map(x => x.trim()).filter(Boolean);
  soloNames = (await soloRes.text()).split(",").map(x => x.trim()).filter(Boolean);
}
loadWordLists();

const card = document.querySelector(".card");
const cardTag = document.querySelector(".tag.late");
const cardFavTag = document.querySelector(".tag.fav"); // new fav tag
const cardTitle = document.getElementById("card-title");
const cardNumber = document.querySelector(".number");
const cardAvatar = document.querySelector(".avatar");

function getRandomItem(arr) {
  return arr.length ? arr[Math.floor(Math.random() * arr.length)] : "";
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function randomizeCards() {
  card.classList.remove("fade-in", "fade-out");
  card.classList.add("fade-out");

  card.addEventListener("animationend", () => {
    card.classList.remove("fade-out");
    cardTag.textContent = getRandomItem(tagOptions);

    if (cardFavTag) {
      let favNumber = getRandomInt(1, 17);
      cardFavTag.textContent = `No. ${favNumber} Fav`;
    }

    let horseName;
    if (Math.random() < 0.3 && soloNames.length) {
      horseName = getRandomItem(soloNames);
    } else {
      let prefix = getRandomItem(prefixes);
      let suffix = getRandomItem(suffixes);
      horseName = [prefix, suffix].filter(Boolean).join(" ");
    }
    cardTitle.textContent = horseName;
    cardNumber.textContent = getRandomInt(1, 16);
    cardAvatar.src = `avatars/avatar${getRandomInt(1, 17)}.png`;


    let [start, end] = getRandomItem(gradientOptions);
    let gradient = `linear-gradient(180deg, ${start} 0%, ${end} 100%)`;
    const stripe = card.querySelector(".stripe");
    if (stripe) stripe.style.background = gradient;
    cardNumber.style.background = gradient;

    card.classList.add("fade-in");
  }, { once: true });
}
