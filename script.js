let LEVEL = 3;
let level_count = LEVEL - 1;
const delay = 400;
const colors = [
  "#e0aaff",
  "#c77dff",
  "#9d4edd",
  "#7b2cbf",
  "#5a189a",
  "#3c096c",
  "#240046",
  "#10002b",
];
let color_count = 0;

const turnObjToArray = function (obj) {
  return [].map.call(obj, function (element) {
    return element;
  });
};

const shuffle = (array) => {
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
};

const fade_out = (element) => {
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
};

const disable_notes = () => {
  notes_arr.forEach((note) => {
    note.style["pointer-events"] = "none";
  });
};

const enable_notes = () => {
  notes_arr.forEach((note) => {
    note.style["pointer-events"] = "auto";
  });
};

const black_all = () => {
  notes_arr.forEach((note) => {
    note.classList.remove("filled");
    note.style.backgroundColor = "black";
    color_count = 0;
  });
};

let sounds = [];
for (let i = 1; i <= 8; ++i) {
  sounds.push(new Audio(`./sounds/${i}.mp3`));
}
let generating_level = false;
let counter = LEVEL;
const click_note = (i) => {
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

  if (!generating_level) {
    let flag = true;
    counter -= 1;
    if (i != correct_order[counter]) {
      flag = false;
      notes[i].style.backgroundColor = "red";
      notes[correct_order[counter]].style.backgroundColor = colors[color_count];
      notes[correct_order[counter]].classList.add("ds");
      disable_notes();
      setTimeout(endLevel, 1500);
    } else {
      notes[i].style.backgroundColor = colors[--color_count];
    }

    if (counter == 0 && flag) {
      score.textContent = (parseInt(score.textContent) + LEVEL).toString();
      disable_notes();
      setTimeout(nextLevel, 1500);
    }
  } else {
    correct_order.push(i);
    notes[i].style.backgroundColor = colors[color_count++];
  }
};

const endLevel = () => {
  fade_out(game);
  points.textContent = score.textContent;
};

const nextLevel = () => {
  correct_order = [];
  black_all();
  if (level_count > 0) {
    level_count -= 1;
  } else {
    LEVEL += 1;
    level_count = LEVEL - 1;
  }
  counter = LEVEL;
  level(LEVEL);
};

let start_page = document.querySelector(".start");
let container = document.querySelector(".container");
let notes = document.querySelectorAll(".container div div");
let score = document.querySelector(".score");
let game = document.querySelector(".game");
let points = document.querySelector(".points");
let over = document.querySelector(".over");

over.addEventListener("click", (e) => {
  location.reload();
});

start_page.addEventListener("click", (e) => {
  start_page.style["pointer-events"] = "none";
  disable_notes();
  fade_out(start_page);
  setTimeout(level.bind(null, LEVEL), delay * 4);
});

let notes_arr = turnObjToArray(notes);
let clicked = [];
let correct_order = [];

for (let i = 0; i < 8; ++i) {
  let note = notes[i];

  note.addEventListener("click", (e) => {
    note.classList.add("filled");
    clicked.push(i);
    click_note(i);
  });
}

const setup = (n) => {
  if (n > 0) {
    let note = selected_notes[n - 1];
    note.click();
    setTimeout(setup.bind(null, n - 1), delay);
  }
};

const end = () => {
  selected_notes.forEach((note) => {
    note.classList.remove("filled");
    note.style.backgroundColor = "black";
  });
  enable_notes();
  clicked = [];
  generating_level = false;
};

const level = (level_num) => {
  window.selected_notes = shuffle(notes_arr).slice(0, level_num);
  generating_level = true;
  setup(level_num);

  setTimeout(end, delay * (level_num + 2));
};
