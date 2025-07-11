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

const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", "295", false, crypto.randomUUID());

console.log(theHobbit.showInfo());