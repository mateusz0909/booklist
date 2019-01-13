class Book {
    constructor(title, author, isbn) {
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

class UI {
    addBookToList(book) {

        const list = document.getElementById('book-list')
        //create tr element
        const row = document.createElement('tr');
        //insert cols
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class='delete'>x</a></td>`

        list.appendChild(row);
    }
    // remove book
    removeBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
    // Local Storage class



    // show allert message 
    alert(message, className) {

        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const bookForm = document.querySelector('#book-form');
        container.insertBefore(div, bookForm);
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000)
    }

    //clear text in fields
    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}
// Local storage class
class Store {

    // get books from local storage if any
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    // display books from local storage
    static displayBooks() {
        const books = Store.getBooks();
        books.forEach(function (book) {
            const ui = new UI;
            ui.addBookToList(book);

        })
    }
    //add book to local storage 
    static addBook(book) {
        const books = Store.getBooks()
        books.push(book)

        localStorage.setItem('books', JSON.stringify(books))
    }

    //remove book from the LS
    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach(function (book, index) {
            if (book.isbn = isbn) {
                books.splice(index, 1)
            }

        })
        localStorage.setItem('books', JSON.stringify(books))
    }
}
//DOM LOAD event listener
document.addEventListener('DOMContentLoaded', Store.displayBooks);

//eventlisteners
document.getElementById('book-form').addEventListener('submit',
    function (e) {
        //get form values
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const isbn = document.getElementById('isbn').value;

        // Instantiate Book
        const book = new Book(title, author, isbn);
        // Instantiate UI
        const ui = new UI();

        //Validate input
        if (title === '' || author === '' || isbn === '') {
            ui.alert('Please check the input', 'error')
        } else {
            //add book to list
            ui.addBookToList(book);

            // Add to local storage
            Store.addBook(book);

            //clear fields
            
            ui.alert('Book added successfully', 'success')
            ui.clearFields();

        }
        e.preventDefault();
    })

//remove listener

document.querySelector('#book-list').addEventListener('click', function (e) {
    // Instantiate UI
    const ui = new UI();
    //remove book from list 
    ui.removeBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    ui.alert('Book removed successfully', 'success')
    e.preventDefault();

})