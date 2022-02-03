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

class Book {
    constructor (title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    bookInfo() {
        const readMessage = this.read ? 'Yes' : 'Not Yet';
        return `Title: ${this.title}
                Author: ${this.author}
                Pages: ${this.pages}
                Read: ${readMessage}`;
    }

    addBookToLibrary() {
        myLibrary.push(this);
    
        const bookCard = document.createElement('div');
        const bookCardInfo = document.createElement('div');
    
        bookCard.classList.add('book-card');
        bookCardInfo.classList.add('book-card-info');
    
        bookCard.appendChild(bookCardInfo);
        bookCardInfo.textContent = this.bookInfo();
    
        addRemoveBookButton(bookCard);
        addReadBookButton(bookCard);
    
        flkty.append(bookCard);
    
    }
}

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
    card.setAttribute('data-book-index', bookIndex++);
    card.appendChild(removeButton);
    removeButton.addEventListener('click', removeBook);
}

function removeBook() {
    flkty.remove(this.parentElement);
    delete myLibrary[this.parentElement.getAttribute('data-book-index')];


}

// Read button

function addReadBookButton(card) {
    const readButton = document.createElement('button');
    readButton.classList.add('book-read');
   
    if (myLibrary[card.getAttribute('data-book-index')].read) {
        readButton.textContent = "Didn't Read";
    } else {
        readButton.textContent = "Read Book";
    }

    card.appendChild(readButton);
    readButton.addEventListener('click', readBook);
}

function readBook() {
    const bookIndex = this.parentElement.getAttribute('data-book-index')
    const bookInfo = this.parentElement.querySelector('.book-card-info');
    const bookReadChange = !(myLibrary[bookIndex].read);
    myLibrary[bookIndex].read = bookReadChange;
    
    if (bookReadChange) {
        this.textContent = "Didn't Read";
    } else {
        this.textContent = "Read Book";
    }

    bookInfo.textContent = myLibrary[bookIndex].bookInfo();

}