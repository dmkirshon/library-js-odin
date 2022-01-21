/**
 * Project: Library Javascript - The Odin Project
 * Author: David Kirshon
 */

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read ? 'been read already':'not been read yet';
}

Book.prototype.bookInfo = function() {
    return `${this.title} by ${this.author} has ${this.pages} pages and has ${this.read}.`;
};

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    myLibrary.forEach((book) => {
        console.log(book.bookInfo());
    });
}

const hobbitBook = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary(hobbitBook);
displayBooks();