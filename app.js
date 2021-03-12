const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const select = document.querySelector('select');
const submit = document.querySelector('#submit');
const container = document.querySelector('.container'); 
const formShow = document.querySelector('#form'); 
const newBook = document.querySelector('#new-book'); 
const formClose = document.querySelector('.close-form'); 
const emptyLocalStorage = document.querySelector('#clear-local-strage'); 



let myLib = []; 

// book constructor 
function Book(title, author, pages, readStatus) { 
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}


// set up the on submit 
submit.addEventListener('click', e => {
    e.preventDefault(); 
    addBookToLib(); 
    formShow.style.display = 'none';
}); 

// add book to the array 
const addBookToLib = () => { 
    const book = new Book(title.value, author.value, pages.value, select.value); 
    myLib.push(book); 
    renderBooks(book); 
    addToLocalStorage(book); 

    // reset the input values 
    title.value = "";
    author.value = ""; 
    pages.value = "";
}; 


// function to render the books 
const renderBooks = book => { 

    // card contect 
    const bookCard = document.createElement('div'); 
    bookCard.classList.add('book-card'); 
    bookCard.setAttribute('container-num', myLib.lastIndexOf(book)); 
    container.appendChild(bookCard)

    const bookTitle = document.createElement('h2'); 
    bookTitle.classList.add('book-title'); 
    bookTitle.textContent = book.title; 
    bookCard.appendChild(bookTitle);
    
    const bookAuthor = document.createElement('div'); 
    bookAuthor.classList.add('book-author'); 
    bookAuthor.textContent = `by: ${book.author}`; 
    bookCard.appendChild(bookAuthor);

    const bookPages = document.createElement('div'); 
    bookPages.classList.add('book-pages'); 
    bookPages.textContent = `pages: ${book.pages}`; 
    bookCard.appendChild(bookPages);

    // create a div container for the remove button 
    const buttonContainer = document.createElement('div'); 
    buttonContainer.classList.add('btncont');

    // create the button for the read status 
    const bookReadStatus = document.createElement('button'); 
    bookReadStatus.classList.add('book-read-status'); 
    bookReadStatus.textContent = book.readStatus; 
    buttonContainer.appendChild(bookReadStatus);
    
    
    // delete/ remove button 
    const removeButton = document.createElement('button'); 
    removeButton.classList.add('remove');
    removeButton.textContent = 'Remove';
    buttonContainer.appendChild(removeButton); 

    bookCard.appendChild(buttonContainer); 

    // remove button event listener 
    removeButton.addEventListener('click', () => {
        const index = bookCard.getAttribute('container-num')
        myLib.splice(index, 1); 
        bookCard.remove(); 
        removeFromLocalStorage(book); 
      
    })
    // on click of the read status button change the text of it between : read || not read 
    bookReadStatus.addEventListener('click', () => {
        const index = bookCard.getAttribute('container-num')
        if (bookReadStatus.textContent === 'Read'){ 
            bookReadStatus.textContent = 'Not Read';
            myLib[index]['readStatus'] = 'Not-Read';
        }else {
            bookReadStatus.textContent = 'Read'; 
            myLib[index]['readStatus'] = 'Read';
        };
    });
};


// add new button to make form pop up 
newBook.addEventListener('click', () => { 
    formShow.style.display = 'block'; 
}); 
// add button that closes the form 
formClose.addEventListener('click', () => {
    formShow.style.display = 'none';
})

// if the user clicks amywhere out of the form it closes
window.addEventListener('click', e => { 
    if (e.target === formShow){ 
        formShow.style.display = 'none';
    }
}); 

// nav bar 
let mainNav = document.querySelector('#js-menu'); 
let navBarToggle = document.querySelector('#js-nav-toggle'); 

navBarToggle.addEventListener('click', () => { 
    mainNav.classList.toggle('active'); 
})


// local storage funstions 

// adds to the local sotrage 
const addToLocalStorage = book => { 
    let storage = JSON.parse(window.localStorage.getItem('booksLocal'));
    if (storage !== null){ 
        storage.push(book); 
        window.localStorage.setItem('booksLocal', JSON.stringify(storage));
    }else { 
        storage = []; 
        storage.push(book); 
        window.localStorage.setItem('booksLocal', JSON.stringify(storage));
    }

}

// adds to the 
const renderFromLocalStroage = () => { 
    let books = JSON.parse(window.localStorage.getItem('booksLocal')); 
    for (let i = 0; i < books.length; i++){ 
        renderBooks(books[i]); 
    }
    console.log(books); 
}

const clearLocalStorage = () => { 
    window.localStorage.clear(); 
}

const removeFromLocalStorage = book => { 
    let storage = JSON.parse(window.localStorage.getItem('booksLocal')); 
    for (let i = 0; i < storage.length; i++){ 
         if (storage[i].title === book.title){ 
            storage.splice(i, 1); 
         }
    }
    window.localStorage.setItem('booksLocal', JSON.stringify(storage));
    console.log('works'); 
}

// button that clears the local storage 
emptyLocalStorage.addEventListener('click', () => { 
    clearLocalStorage();
})

// check if local sotrage id empty or not 
if (window.localStorage.length > 0) { 
    renderFromLocalStroage(); 
    console.log(window.localStorage.length) 
}else {
    console.log('Local Storage is empty')
}