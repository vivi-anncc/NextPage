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
            const response = await fetch(
                `/api/books/${editingBookId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: title,
                        author: author,
                        genre: genre
                    })
                }
            );

            const updatedBook = await response.json();

            setBooks((currentBooks) =>
                currentBooks.map((book) =>
                    book.id === editingBookId
                        ? updatedBook
                        : book
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

            setBooks((currentBooks) => [
                ...currentBooks,
                newBook
            ]);
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
        <main className="page">
            <div className="page-container">

                <div className="page-header">
                    <h1>My Books</h1>

                    <p>
                        Keep track of the books in your collection.
                    </p>
                </div>

                <form
                    className="book-form"
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="title">
                        Title
                    </label>

                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(event) =>
                            setTitle(event.target.value)
                        }
                        placeholder="Enter book title"
                        required
                    />

                    <label htmlFor="author">
                        Author
                    </label>

                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(event) =>
                            setAuthor(event.target.value)
                        }
                        placeholder="Enter author"
                        required
                    />

                    <label htmlFor="genre">
                        Genre
                    </label>

                    <select
                        id="genre"
                        value={genre}
                        onChange={(event) =>
                            setGenre(event.target.value)
                        }
                        required
                    >
                        <option value="">
                            Select a genre
                        </option>

                        <option value="Fantasy">
                            Fantasy
                        </option>

                        <option value="Science Fiction">
                            Science Fiction
                        </option>

                        <option value="Mystery">
                            Mystery
                        </option>

                        <option value="Romance">
                            Romance
                        </option>

                        <option value="Adventure">
                            Adventure
                        </option>

                        <option value="Horror">
                            Horror
                        </option>

                        <option value="Slice of Life">
                            Slice of Life
                        </option>
                    </select>

                    <button type="submit">
                        {editingBookId !== null
                            ? "Update Book"
                            : "Add Book"}
                    </button>

                    {editingBookId !== null && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditingBookId(null);
                                setTitle("");
                                setAuthor("");
                                setGenre("");
                            }}
                        >
                            Cancel
                        </button>
                    )}
                </form>

                <button onClick={handleViewBooks}>
                    View My Books
                </button>

                <div className="books-list">
                    {books.map((book) => (
                        <div
                            className="book-card"
                            key={book.id}
                        >
                            <h3>
                                {book.title}
                            </h3>

                            <p>
                                By {book.author}
                            </p>

                            <p>
                                Genre: {book.genre}
                            </p>

                            <div className="book-actions">
                                <button
                                    onClick={() =>
                                        handleEdit(book)
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(book.id)
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </main>
    );
}

export default Books;