class Book {
  constructor(bookName, author, publishYear, isbn) {
    this.bookName = bookName;
    this.author = author;
    this.publishYear = publishYear;
    this.isbn = isbn;
  }
}
class UI {
  static switchBetweenBtns() {
    document.querySelector(".form-container").style.display = "none";
    document.querySelector(".form").reset();
    document.querySelector(".search").style.display = "block";
  }
  static addBookToTable(bookInfo) {
    const tableBody = document.querySelector("#book-list"),
      tableRow = document.createElement("tr");
    tableRow.className = "table-row";
    tableRow.innerHTML = `<td>${bookInfo.bookName}</td>
                        <td>${bookInfo.author}</td>
                        <td>${bookInfo.publishYear}</td>
                        <td>${bookInfo.isbn}</td>`;
    tableBody.appendChild(tableRow);
  }
  static cancelbtn() {
    submit.style.display = "none";
    const form = document.querySelector(".form");
    form.reset();
  }
  static showAlert(message) {
    const msgContainer = document.querySelector(".msg-container");
    const msg = document.querySelector(".msg");
    msg.innerText = message;
    msgContainer.appendChild(msg);
  }
  static find() {
    const userInput = document.querySelector(".search-input");
    const text = userInput.value.toLowerCase();
    document.querySelectorAll(".table-row").forEach(function (data) {
      const tableData = data.textContent;
      if (tableData.toLowerCase().indexOf(text) != -1) {
        data.style.display = "";
      } else {
        data.style.display = "none";
      }
    });
  }
  static deleteAllBooks() {
    document.querySelectorAll("td").forEach(function (data) {
      data.parentNode.remove();
    });
  }
  static hide() {
    document.querySelector(".search").style.display = "none";
  }
  static displayBooks() {
    const books = Store.getBooksFromStorage();
    books.forEach(UI.addBookToTable);
  }
  static changeLinkColor(bgColor, color, bgColor1, color1, bgColor2, color2) {
    addBook.style.backgroundColor = bgColor;
    addBook.style.color = color;
    search.style.backgroundColor = bgColor1;
    search.style.color = color1;
    deleteAll.style.backgroundColor = bgColor2;
    deleteAll.style.color = color2;
  }
}

//Variables
const addBook = document.querySelector(".btn-green"),
  search = document.querySelector(".btn-orange"),
  closeSearch = document.querySelector(".fa-close"),
  deleteAll = document.querySelector(".btn-red"),
  submit = document.querySelector(".form-container"),
  cancel = document.querySelector(".cancel-btn"),
  variable = document.querySelector(":root"),
  variableStyles = getComputedStyle(variable),
  green = variableStyles.getPropertyValue("--green"),
  orange = variableStyles.getPropertyValue("--orange"),
  pink = variableStyles.getPropertyValue("--pink"),
  light = variableStyles.getPropertyValue("--light-color");

//Event Listeners
document.addEventListener("DOMContentLoaded", UI.displayBooks);
addBook.addEventListener("click", addNewBook);
search.addEventListener("click", findBooks);
deleteAll.addEventListener("click", deleteBooks);
submit.addEventListener("click", submitBooks);
cancel.addEventListener("click", cancelSubmit);
closeSearch.addEventListener("click", hideSearchBar);

// Store in LocalStorage
class Store {
  static getBooksFromStorage() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static storeBook(book) {
    const books = Store.getBooksFromStorage();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static deleteFromStorage() {
    localStorage.clear();
  }
}
//function declarations
function addNewBook(e) {
  submit.style.display = "block";
  document.querySelector(".search").style.display = "none";
  UI.changeLinkColor(green, light, "", "", "", "");
  e.preventDefault();
}
function findBooks(e) {
  UI.switchBetweenBtns();
  UI.changeLinkColor("", "", orange, light, "", "");
  const userInput = document.querySelector(".search-input");
  userInput.focus();
  userInput.addEventListener("keyup", function () {
    UI.showAlert("");
    UI.find();
  });
  e.preventDefault();
}
function hideSearchBar(e) {
  UI.hide();
  UI.changeLinkColor("", "", "", "", "", "");
  e.preventDefault();
}
function deleteBooks(e) {
  const tableBody = document.querySelector("#book-list");
  UI.changeLinkColor("", "", "", "", pink, light);
  if (tableBody.rows.length == 0) {
    UI.showAlert("There are no items to delete!");
  } else {
    UI.deleteAllBooks();
    Store.deleteFromStorage();
  }
  e.preventDefault();
}
function submitBooks(e) {
  const form = document.querySelector(".form"),
    bookName = document.querySelector("#book-name").value,
    author = document.querySelector("#author").value,
    publishYear = document.querySelector("#pulish-year").value,
    isbn = document.querySelector("#isbn").value,
    book = new Book(bookName, author, publishYear, isbn);
  if (e.target.classList.contains("submit-btn")) {
    if (bookName === "" || author === "" || publishYear === "" || isbn === "") {
      UI.showAlert("Please make sure to fill out all the fields correctly!");
    } else {
      UI.showAlert("");
      UI.addBookToTable(book);
      Store.storeBook(book);
      form.reset();
    }
  }
  e.preventDefault();
}
function cancelSubmit(e) {
  UI.cancelbtn();
  UI.changeLinkColor("", "", "", "", "", "");
  UI.showAlert("");
  e.preventDefault();
}