//book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI constructor
function UI() { }

//add book to the list
UI.prototype.addBookToList = function (book) {
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

//remove book from the list
UI.prototype.removeBook = function (target) { 
  if (target.className ==='delete') {
    target.parentElement.parentElement.remove();
  }
}

// clear fields
UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}
//show allert
UI.prototype.alert = function (message, className) {
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
      //clear fields
      ui.clearFields();
      ui.alert('Book added successfully', 'success')

    }
    e.preventDefault();
  })

  //remove listener

document.querySelector('#book-list').addEventListener('click',function (e) { 
// Instantiate UI
  const ui = new UI();
//remove book from list 
  ui.removeBook(e.target);  
  ui.alert('Book removed successfully', 'success')
  e.preventDefault();
  
})