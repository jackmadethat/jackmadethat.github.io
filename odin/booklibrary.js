let bookList = document.getElementById("bookList");
let bookArray = [];

function Book(title, author, pages, read, id) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call this constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
  this.showInfo = function() {
    return title + " by " + author + ", " + pages + " pages, " + (read ? "has been read" : "has not been read") + ", ID: " + id;
  };
}

const showForm = (toggle) => {
  toggle ? 
  (document.getElementById("addBookForm").style.display = "block", document.getElementById("addBookBtn").style.display = "none") : 
  (document.getElementById("addBookForm").style.display = "none",  document.getElementById("addBookBtn").style.display = "block");
}

const removeBook = (id) => {
  for (let i = 0; i < bookArray.length; i++) {
    if (bookArray[i].id == id) {
      bookArray.splice(i, 1);
      break;
    }
  }

  document.getElementById('bookList').innerHTML = "";
  
  for (let j = 0; j < bookArray.length; j++) {
    const bookListItem = document.createElement('li');
    bookListItem.innerHTML = bookArray[j].showInfo();
    let deleteButton = document.createElement('button');
    deleteButton.innerText = "Remove";
    deleteButton.addEventListener('click', function() {
      removeBook(bookArray[j].id);
    });
    bookListItem.appendChild(deleteButton);
    document.getElementById('bookList').appendChild(bookListItem);
  }
}

document.getElementById("addBookForm").addEventListener("submit", function(event) {
  event.preventDefault();

  let newBook = new Book(this.title.value, this.author.value, this.no_pages.value, this.has_been_read_0.checked, crypto.randomUUID());

  bookArray.push(newBook);
  document.getElementById('bookList').innerHTML = "";

  for (let i = 0; i < bookArray.length; i++) {
    const bookListItem = document.createElement('li');
    bookListItem.innerHTML = bookArray[i].showInfo();
    let deleteButton =  document.createElement('button');
    deleteButton.innerText="Remove";
    deleteButton.setAttribute("onClick", `removeBook('${bookArray[i].id}')`);
    bookListItem.appendChild(deleteButton);
    document.getElementById('bookList').appendChild(bookListItem);
  }

  this.reset();
  showForm(false);
});

// const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", "295", false, crypto.randomUUID());
// console.log(theHobbit.showInfo());