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

for (let i = 0; i < 8; ++i) {
  let note = notes[i];
  note.addEventListener("click", (e) => {});
}

let n = 5;
const selected_notes = shuffle(notes_arr).slice(0, n);

selected_notes.forEach((note) => {
  console.log(note);
  console.log(note.classList);
  note.classList.add("filled");
  console.log(note.classList);
});
