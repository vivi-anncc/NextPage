import { useState } from "react";

function Books() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [books, setBooks] = useState([]);
    const [editingBookId, setEditingBookId] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();

        if (editingBookId !== null) {
            const response = await fetch(`/api/books/${editingBookId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title,
                    author: author,
                    genre: genre
                })
            });

            const updatedBook = await response.json();

            setBooks((currentBooks) =>
                currentBooks.map((book) =>
                    book.id === editingBookId ? updatedBook : book
                )
            );

            setEditingBookId(null);
        } else {
            const response = await fetch("/api/books", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title,
                    author: author,
                    genre: genre
                })
            });

            const newBook = await response.json();

            setBooks((currentBooks) => [...currentBooks, newBook]);
        }

        setTitle("");
        setAuthor("");
        setGenre("");
    }

    async function handleViewBooks() {
        const response = await fetch("/api/books");
        const data = await response.json();

        setBooks(data);
    }

    function handleEdit(book) {
        setTitle(book.title);
        setAuthor(book.author);
        setGenre(book.genre);
        setEditingBookId(book.id);
    }

    async function handleDelete(bookId) {
        await fetch(`/api/books/${bookId}`, {
            method: "DELETE"
        });

        setBooks((currentBooks) =>
            currentBooks.filter((book) => book.id !== bookId)
        );

        if (editingBookId === bookId) {
            setEditingBookId(null);
            setTitle("");
            setAuthor("");
            setGenre("");
        }
    }

    return (
        <section>
            <h2>My Books</h2>

            <p>Books in my library.</p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="bookTitle">
                    Book Title
                </label>

                <input
                    type="text"
                    id="bookTitle"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />

                <label htmlFor="bookAuthor">
                    Author
                </label>

                <input
                    type="text"
                    id="bookAuthor"
                    value={author}
                    onChange={(event) => setAuthor(event.target.value)}
                />

                <label htmlFor="bookGenre">
                    Genre
                </label>

                <input
                    type="text"
                    id="bookGenre"
                    value={genre}
                    onChange={(event) => setGenre(event.target.value)}
                />

                <button type="submit">
                    {editingBookId !== null ? "Update Book" : "Add Book"}
                </button>
            </form>

            <button onClick={handleViewBooks}>
                View My Books
            </button>

            <div>
                {books.map((book) => (
                    <div key={book.id}>
                        <p>
                            {book.title} by {book.author}
                        </p>

                        <p>
                            Genre: {book.genre}
                        </p>

                        <button onClick={() => handleEdit(book)}>
                            Edit
                        </button>

                        <button onClick={() => handleDelete(book.id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Books;