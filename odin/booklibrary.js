let bookList = document.getElementById("bookList");

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

document.getElementById("addBookForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const title = this.title.value;
  const author = this.author.value;
  const noPages = this.no_pages.value;
  const hasBeenRead = this.has_been_read_0.checked;
  const bookListItem = document.createElement('li');
  bookListItem.innerHTML = `
    <span>Title: ${title}</span>
    <span>Author: ${author}</span>
    <span>Pages: ${noPages}</span>
    <span>Read: ${hasBeenRead ? 'Yes' : 'No'}</span>
  `;
  document.getElementById('bookList').appendChild(bookListItem);
  this.reset();
});

// const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", "295", false, crypto.randomUUID());
// console.log(theHobbit.showInfo());