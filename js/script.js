/**
 * Project: Library Javascript - The Odin Project
 * Author: David Kirshon
 */

const newBookBtn = document.querySelector('.book-new');
const newBookForm = document.querySelector('.book-form');
const newBookSubmissionMessage = document.querySelector('.book-submission-message');

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read ? 'already been read':'not been read yet';
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

// add book button

newBookBtn.addEventListener('click', showBookForm);

function showBookForm() {
    newBookSubmissionMessage.hidden = true;
    newBookForm.hidden = false;
}

newBookForm.addEventListener('submit', submitForm);

function submitForm(event) {
    event.preventDefault();

    const bookTitle = document.getElementById('bookTitle').value;
    const bookAuthor = document.getElementById('bookAuthor').value;
    const bookPages = document.getElementById('bookPages').value;
    const bookRead = document.getElementById('bookRead').checked;

    const newBookSubmission = new Book(bookTitle, bookAuthor, bookPages, bookRead);

    addBookToLibrary(newBookSubmission);
    newBookForm.reset();
    newBookForm.hidden = true;
    newBookSubmissionMessage.hidden = false;
}