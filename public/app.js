const readBooksButton = document.getElementById("readBooksButton");

const booksContainer = document.getElementById("booksContainer");

const bookForm = document.getElementById("bookForm");

const bookTitle = document.getElementById("bookTitle");

const bookAuthor = document.getElementById("bookAuthor");

function getBooks() {

    fetch("/api/books")
        .then((response) => response.json())
        .then((books) => {

            booksContainer.innerHTML = "";

            books.forEach((book) => {

                const bookElement = document.createElement("div");

                bookElement.innerHTML = `
                    <h3>${book.title}</h3>
                    <p>Author: ${book.author}</p>
                `;

                booksContainer.appendChild(bookElement);
            });

        });
}


readBooksButton.addEventListener("click", getBooks);

bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const book = {
        title: bookTitle.value,
        author: bookAuthor.value
    };

    fetch("/api/books", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(book)
    });
});