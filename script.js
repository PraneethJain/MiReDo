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

let notes = document.querySelectorAll(".container div div");
let notes_arr = turnObjToArray(notes);

console.log(notes);

for (let i = 0; i < 8; ++i) {
  let note = notes[i];
  let x = -1;
  switch (i) {
    case 0:
      x = 1;
      break;
    case 1:
      x = 8;
      break;
    case 2:
      x = 7;
      break;
    case 3:
      x = 2;
      break;
    case 4:
      x = 6;
      break;
    case 5:
      x = 3;
      break;
    case 6:
      x = 4;
      break;
    case 7:
      x = 5;
      break;
  }

  let cur_sound = new Audio(`./sounds/${x}.mp3`);

  note.addEventListener("click", (e) => {
    cur_sound.play();
  });
}

let n = 3;
const selected_notes = shuffle(notes_arr).slice(0, n);

selected_notes.forEach((note) => {
  console.log(note);
  console.log(note.classList);
  note.classList.add("filled");
  console.log(note.classList);
});
