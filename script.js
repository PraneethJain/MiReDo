// Utility Functions

const turnObjToArray = function (obj) {
  return [].map.call(obj, function (element) {
    return element;
  });
};

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function fade_out(element) {
  var op = 1;
  var timer = setInterval(function () {
    if (op <= 0.1) {
      clearInterval(timer);
      element.style.display = "none";
    }
    element.style.opacity = op;
    element.style.filter = "alpha(opacity=" + op * 100 + ")";
    op -= op * 0.1;
  }, 50);
}

function fade_in(element) {
  var op = 0.1;
  element.style.display = "block";
  var timer = setInterval(function () {
    if (op >= 1) {
      clearInterval(timer);
    }
    element.style.opacity = op;
    element.style.filter = "alpha(opacity=" + op * 100 + ")";
    op += op * 0.1;
  }, 10);
}

let sounds = [];
for (let i = 1; i <= 8; ++i) {
  sounds.push(new Audio(`./sounds/${i}.mp3`));
}

function click_note(i) {
  let x = -1;
  switch (i) {
    case 0:
      x = 0;
      break;
    case 1:
      x = 7;
      break;
    case 2:
      x = 6;
      break;
    case 3:
      x = 1;
      break;
    case 4:
      x = 5;
      break;
    case 5:
      x = 2;
      break;
    case 6:
      x = 3;
      break;
    case 7:
      x = 4;
      break;
  }

  sounds[x].play();
}

let delay = 400;

let start_page = document.querySelector(".start");
let container = document.querySelector(".container");
start_page.addEventListener("click", (e) => {
  fade_out(start_page);
  setTimeout(game, delay * 4);
  setTimeout(end, delay * (n + 6));
});

let notes = document.querySelectorAll(".container div div");
let notes_arr = turnObjToArray(notes);

for (let i = 0; i < 8; ++i) {
  let note = notes[i];

  note.addEventListener("click", (e) => {
    note.classList.add("filled");
    click_note(i);
  });
}

let n = 4;
const selected_notes = shuffle(notes_arr).slice(0, n);

function game() {
  n -= 1;
  if (n >= 0) {
    let note = selected_notes[n];
    note.click();
    setTimeout(game, delay);
  }
}

const end = () => {
  selected_notes.forEach((note) => {
    note.classList.remove("filled");
  });
};
