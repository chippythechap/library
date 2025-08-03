const container = document.querySelector(".container");
const content = document.querySelector(".content");
const newBook = document.querySelector("#newBook");
const addBook = document.querySelector("#addBook");
const dialog = document.querySelector("dialog");
const closeBtn = document.querySelector("#closeDialog");

const myLibrary = [];

newBook.addEventListener("click", () => {
  dialog.showModal();
});

dialog.addEventListener("submit", (event) => {
  let name = event.target.name.value;
  let author = event.target.author.value;
  let pages = event.target.pages.value;
  let isRead = event.target.isRead.checked;

  event.preventDefault();

  addBookToLibrary(name, author, pages, isRead);

  event.target.reset();

  displayArrayAsTable(myLibrary);

  dialog.close();
});

closeBtn.addEventListener("click", () => {
  dialog.close();
})

addBookToLibrary("Harry Potter", "Angela Merkel", 242, true);
addBookToLibrary("Jack Sparrow", "PewDiePie", 312, true);
addBookToLibrary("Per Anhalter durch die Galaxis", "Fish", 165, false);
addBookToLibrary("Cool Book", "Cool Guy 123", 42, true);
addBookToLibrary("Not so cool Book", "Karaoke123", 1342, false);

displayArrayAsTable(myLibrary);

function Book(name, author, pages, isRead) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(name, author, pages, isRead) {
  myLibrary.push(new Book(name, author, pages, isRead));
}

function displayArrayAsTable(array) {
  content.innerHTML = "";

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  createThead(array, thead);
  createTbody(array, tbody);

  table.appendChild(thead);
  table.appendChild(tbody);
  content.appendChild(table);
}

function createThead(array, thead) {
  const tr = document.createElement("tr");
  Object.keys(array[0]).forEach((key) => {
    const th = document.createElement("th");
    th.textContent = key;
    tr.appendChild(th);
  });
  const th = document.createElement("th");
  const p = document.createElement("p");
  p.innerHTML = "";
  th.appendChild(p);
  tr.appendChild(th);
  thead.appendChild(tr);
  return thead;
}

function createTbody(array, tbody) {
  for (let i = 0; i < myLibrary.length; i++) {
    const tr = document.createElement("tr");
    Object.entries(array[i]).forEach(([key, value]) => {
      const td = document.createElement("td");
      if (value === true || value === false) {
        const button = document.createElement("button");
        button.textContent = value;
        button.addEventListener("click", () => {
          myLibrary[i][key] = !myLibrary[i][key];
          displayArrayAsTable(myLibrary);
        })
        td.appendChild(button);
      } else {
        td.textContent = value;
      }
      tr.appendChild(td);
    });
    const td = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.innerHTML = '<i class="material-symbols-outlined">close</i>';
    removeButton.classList += "red";
    removeButton.addEventListener("click", () => {
      myLibrary.splice(i, 1);
      document.querySelector("table").remove();
      displayArrayAsTable(myLibrary);
    });
    td.appendChild(removeButton);
    tr.appendChild(td);
    tbody.appendChild(tr);
  }

  return tbody;
}