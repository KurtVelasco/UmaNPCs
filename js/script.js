let prefixes = [];
let suffixes = [];
let soloNames = [];
const tagOptions = ["Late", "Pace", "End", "Front"];


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
  cardTag.textContent = tagOptions[Math.floor(Math.random() * tagOptions.length)];
    let horseName;
    if (Math.random() < 0.3 && soloNames.length) {
      horseName = getRandomItem(soloNames);
    } else {
      horseName = `${getRandomItem(prefixes)} ${getRandomItem(suffixes)}`.trim();
    }
    cardTitle.textContent = horseName;

    cardNumber.textContent = getRandomInt(1, 16);
    cardAvatar.src = `avatars/avatar${getRandomInt(1, 17)}.png`;

    card.classList.add("fade-in");
  }, { once: true });
}
