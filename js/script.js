/**
 * Project: Library Javascript - The Odin Project
 * Author: David Kirshon
 */

const newBookBtn = document.querySelector('.book-new');
const newBookForm = document.querySelector('.book-form');
const newBookSubmissionMessage = document.querySelector('.book-submission-message');
const bookCards = document.querySelector('.book-cards');
const flkty = new Flickity('.book-cards', {wrapAround: true});

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read
}

Book.prototype.bookInfo = function() {
    const readMessage = this.read ? 'Yes':'Not Yet';
    return `Title: ${this.title}
            Author: ${this.author}
            Pages: ${this.pages}
            Read: ${readMessage}`;
};

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBook(book) {
    const bookCardInfo = document.createElement('div');
    bookCardInfo.classList.add('book-card-info');
    bookCardInfo.textContent = book.bookInfo();
    bookCards.appendChild(bookCardInfo);
    flkty.append(bookCardInfo);
}

// example book

const hobbitBook = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary(hobbitBook);
displayBook(hobbitBook);

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
    displayBook(newBookSubmission);
    newBookForm.reset();
    newBookForm.hidden = true;
    newBookSubmissionMessage.hidden = false;
}