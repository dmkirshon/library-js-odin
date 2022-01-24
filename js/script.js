/**
 * Project: Library Javascript - The Odin Project
 * Author: David Kirshon
 */

const newBookBtn = document.querySelector('.book-new');
const newBookForm = document.querySelector('.book-form');
const newBookSubmissionMessage = document.querySelector('.book-submission-message');
const bookCards = document.querySelector('.book-cards');
const flkty = new Flickity('.book-cards', { wrapAround: true});

let myLibrary = [];
let bookIndex = 0;

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.bookInfo = function () {
    const readMessage = this.read ? 'Yes' : 'Not Yet';
    return `Title: ${this.title}
            Author: ${this.author}
            Pages: ${this.pages}
            Read: ${readMessage}`;
};

Book.prototype.addBookToLibrary = function () {
    myLibrary.push(this);
    const bookCardInfo = document.createElement('div');
    bookCardInfo.classList.add('book-card-info');
    bookCardInfo.textContent = this.bookInfo();
    addRemoveBookButton(bookCardInfo);
    flkty.append(bookCardInfo);

};

// example book

const hobbitBook = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
const hobbitBook2 = new Book('The Hobbit', 'J.R.R. Tolkien', 296, true);
const hobbitBook3 = new Book('The Hobbit', 'J.R.R. Tolkien', 297, true);
const hobbitBook4 = new Book('The Hobbit', 'J.R.R. Tolkien', 298, true);
const hobbitBook5 = new Book('The Hobbit', 'J.R.R. Tolkien', 299, true);
hobbitBook.addBookToLibrary();
hobbitBook2.addBookToLibrary();
hobbitBook3.addBookToLibrary();
hobbitBook4.addBookToLibrary();
hobbitBook5.addBookToLibrary();


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

    newBookSubmission.addBookToLibrary();
    newBookForm.reset();
    newBookForm.hidden = true;
    newBookSubmissionMessage.hidden = false;
}


// Remove button for book

function addRemoveBookButton(card) {
    const removeButton = document.createElement('button');
    removeButton.classList.add('book-remove');
    removeButton.textContent = 'Remove Book';
    removeButton.setAttribute('data-book-index', bookIndex++);
    card.appendChild(removeButton);
    removeButton.addEventListener('click', removeBook);
}

function removeBook() {
    flkty.remove(this.parentElement);
    delete myLibrary[this.getAttribute('data-book-index')];
}