const myLibrary = [];

//Creating new book object using class
class Book {
    constructor (name, author, pages, id, read) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.id = id;
        this.read = read;
    }

    createReadStatusBtn (bookDiv) {
        const radioContainer = document.createElement("div");
        radioContainer.style.display = "flex";
        radioContainer.style.marginTop = "1rem";

        const radioStatus = document.createElement("div");
        radioStatus.textContent = "Read-Status: ";

        const yesRadio = document.createElement("input");
        yesRadio.type = "radio";

        const radioGroup = "read-status " + this.id;
        yesRadio.name = radioGroup;
        yesRadio.id = "yes";

        const yesLabel = document.createElement("label");
        yesLabel.htmlFor = "yes";
        yesLabel.textContent = "Yes";

        const noRadio = document.createElement("input");
        noRadio.type = "radio";
        noRadio.name = radioGroup;
        noRadio.id = "no";

        const noLabel = document.createElement("label");
        noLabel.htmlFor = "no";
        noLabel.textContent = "No";

        radioContainer.appendChild(radioStatus);
        radioContainer.appendChild(yesRadio);
        radioContainer.appendChild(yesLabel);
        radioContainer.appendChild(noRadio);
        radioContainer.appendChild(noLabel);
        bookDiv.appendChild(radioContainer);
        return radioContainer;
    }

    //Making selection on radio button
    radioSelection (yesradio,noradio) {
        const selectReadStatus = document.querySelector("select");
        if (selectReadStatus.value == "yes") {
            this.read = "yes";
            yesradio.checked = true;

        } else {
            this.read = "no";
            noradio.checked = true;
    }

        const formElement = document.querySelector("form");
        formElement.reset();
}


    //Toggle read attribute when radio button is toggled
    readStatusToggle () {
        const bookContainer = document.querySelector(".books-container");
        bookContainer.addEventListener("change", (e) => {
            const bookCard = e.target.closest(".book");
            if (bookCard.dataset.id == this.id) {
                this.read = e.target.id;
            }
    })
}

    //Delete book cards using delete button
    delBook () {
        const bookContainer = document.querySelector(".books-container");
        const bookCard = document.querySelector(`[data-id = "${this.id}"]`);
        const delBtn = bookCard.querySelector(".del-div");
        delBtn.addEventListener("click", () => {

        //Remove book from DOM
        bookContainer.removeChild(bookCard);

        //Remove book object from Library
        const indexOfBookToDel = myLibrary.findIndex((element) => element.id == this.id);
        if (indexOfBookToDel !== -1) {
            myLibrary.splice(indexOfBookToDel,1);
        }
})
}

}

//Adding newbook to Library
function addBookToLibrary (name, author, pages, id=crypto.randomUUID(), read="no") {
    let newBook = new Book (name, author, pages, id, read); //Actual book obj
    myLibrary.push(newBook);
    return newBook;
}


//create individual book card and append to the main container
    function createBookCard () {
        let bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.style.backgroundColor = "burlywood";
        bookDiv.style.height = "200px";
        bookDiv.style.width = "200px";
        document.querySelector('.books-container').appendChild(bookDiv);
        return bookDiv;
}


//Adding card for the newbook, delete, and read-status toggles (when book is added manually)
function addNewBookInfo (newBook) {
    const delDiv = document.createElement("div");
    delDiv.classList.add("del-div");
    delDiv.style.marginTop = "2px";
    delDiv.style.marginRight = "2px";
    const xButton = document.createElement("button");
    xButton.textContent = 'X';
    delDiv.appendChild(xButton);
    delDiv.style.textAlign = "end";
    let newBookCard = createBookCard(); //Card to hold book info
    const bookHead = document.createElement("h4");
    bookHead.textContent = newBook.name;
    bookHead.style.marginTop = "2px";
    bookHead.style.marginBottom = "5px";
    newBookCard.appendChild(delDiv);
    newBookCard.appendChild(bookHead);
    newBookCard.style.paddingLeft = "5px";
    newBookCard.style.border = "1px solid grey";
    const bookName = document.createTextNode(newBook.name + " by ");
    const authName = document.createTextNode(newBook.author + ", ");
    const pagesCount = document.createTextNode(newBook.pages + " pages");
    newBookCard.appendChild(bookName);
    newBookCard.appendChild(authName);
    newBookCard.appendChild(pagesCount);
    newBookCard.dataset.id = newBook.id;

    //Creating and adding radio buttons to cards; from Book.prototype
    let readStatusRadioContainer = newBook.createReadStatusBtn(newBookCard);

    //marking radio option yes/no; from Book.prototype
    newBook.radioSelection(readStatusRadioContainer.children[1], readStatusRadioContainer.children[3]);

    //Change book's read status in library when radio button is toggled
    newBook.readStatusToggle();

    //Delete book from DOM and the related object from library
    newBook.delBook();
}

//create newbook element and html elements to be placed inside the card (when adding book using form)
    function addBookInfo (bookDiv) {
        
        const delDiv = document.createElement("div");
        delDiv.classList.add("del-div");
        delDiv.style.marginTop = "2px";
        delDiv.style.marginRight = "2px";
        const xButton = document.createElement("button");
        xButton.textContent = 'X';
        delDiv.appendChild(xButton);
        delDiv.style.textAlign = "end";
        bookDiv.appendChild(delDiv);
        const bookHead = document.createElement("h4");
        bookHead.style.marginTop = "2px";
        bookHead.style.marginBottom = "5px";
        const titleInput = document.querySelector(".title");
        bookHead.textContent = titleInput.value;
        bookDiv.appendChild(bookHead);

        bookDiv.style.paddingLeft = "5px";
        bookDiv.style.border = "1px solid grey";
        const authInput = document.querySelector(".author");
        const pagesInput = document.querySelector(".pages");
        const bookName = document.createTextNode(titleInput.value + " by ");
        const authName = document.createTextNode(authInput.value + ", ");
        const pagesCount = document.createTextNode(pagesInput.value + " pages");

        let newBook = addBookToLibrary(titleInput.value, authInput.value, pagesInput.value);
        bookDiv.dataset.id = newBook.id;
        newBook.readStatusToggle(); //Change book's read status in the library when radio is toggled
        newBook.delBook(); //Delete book card from DOM and object from library

        bookDiv.appendChild(bookName);
        bookDiv.appendChild(authName);
        bookDiv.appendChild(pagesCount);

        return newBook;
}

//Main script
const formDialog = document.querySelector("dialog");
const newBookBtn = document.querySelector(".new-book");
const cancelBtn = document.querySelector(".cancel");

//This opens the dialog box to add new book details
newBookBtn.addEventListener("click", () => {
    formDialog.showModal();
});

//Closes the form dialog;
cancelBtn.addEventListener("click", () => {
    formDialog.close();
})

//Adding a book card; Form submission/confirmation
const confirmBtn = document.querySelector(".confirm");

confirmBtn.addEventListener("click", () => {
    let newBookCard = createBookCard();

    //Creating elements to be placed inside the card/div
    let newBookInLib = addBookInfo(newBookCard);

    //Creating and adding radio buttons to cards; from Book.prototype
    let readStatusRadioContainer = newBookInLib.createReadStatusBtn(newBookCard);

    //marking radio option yes/no based on drop-down selection; from Book.prototype
    newBookInLib.radioSelection(readStatusRadioContainer.children[1], readStatusRadioContainer.children[3]);
})

//============================================================================

// Adding books
let bookOne = addBookToLibrary("This is Book1", "Author One", 101);
addNewBookInfo(bookOne);
bookOne.readStatusToggle();
// bookOne.delBook();

let bookTwo = addBookToLibrary("This is Book2", "Author Two", 201);
addNewBookInfo(bookTwo);
bookTwo.readStatusToggle();
// bookTwo.delBook();