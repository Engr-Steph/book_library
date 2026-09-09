const myLibrary = [];

class Book {
    constructor( title, author, pages, read) {
        this.id = crypto.randomUUID();
        this.title = title; 
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }; 
}     



function addBookToLibrary(title, author, pages, read) {
     const book = new Book(title, author, pages, read);
     myLibrary.push(book) 
} 

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false);
addBookToLibrary("D-cos", "George Orwell", 328, true);
addBookToLibrary("Clean Code", "Robert C. Martin", 464, false); 
addBookToLibrary("Things fall apart", "Chinua Achebe", 200, false);

const library = document.querySelector("#library");

const newBookButton = document.querySelector("#new-book-btn");
const bookDialog = document.querySelector("#book-dialog");
const bookForm = document.querySelector("#book-form");
const cancelButton = document.querySelector("#cancel-btn");

function displayBooks() {
    library.innerHTML = ""; 
    myLibrary.forEach(function(book){ 
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.innerHTML = `
            <h2>${book.title}</h2> 
            <p>author: ${book.author}</p> 
            <p>pages: ${book.pages}</p> 
            <p>read: ${book.read ? "yes" : "no"}</p> 
            <button class="remove-book" data-id="${book.id}">Remove book</button>
             <button class="toggle-read" data-id="${book.id}">Toggle Read</button>
        `;
        library.appendChild(bookCard);

        const removeButton = bookCard.querySelector(".remove-book");
        removeButton.addEventListener("click", function(){
            const bookId = this.dataset.id;
            const bookIndex = myLibrary.findIndex(function(book){
                return book.id === bookId;
            });
            myLibrary.splice(bookIndex, 1);
            displayBooks();

        });
        const toggleButton = bookCard.querySelector(".toggle-read");
        toggleButton.addEventListener("click", function() {
            const bookId = toggleButton.dataset.id;
            const bookIndex = myLibrary.findIndex(function(book) {
                return book.id === bookId;
            });

            const book = myLibrary[bookIndex];
            book.toggleRead();
            displayBooks();
        });
    });
}

newBookButton.addEventListener("click", function(){
    bookDialog.showModal();
});
cancelButton.addEventListener("click", function(){
    bookDialog.close();
});
bookForm.addEventListener("submit", function(event){
    event.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").checked;

    addBookToLibrary(title, author, pages, read);

    displayBooks();

    bookForm.reset();
    bookDialog.close();

});

displayBooks();