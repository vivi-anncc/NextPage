import { useState } from "react";

function Books() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [books, setBooks] = useState([]);

    return (
        <section>
            <h2>My Books</h2>

            <p>Books in my library.</p>

            <form>
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

                <button type="submit">
                    Add Book
                </button>
            </form>

            <button>
                View My Books
            </button>
        </section>
    );
}

export default Books;