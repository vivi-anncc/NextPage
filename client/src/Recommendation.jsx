import { useState } from "react";

function Recommendation() {
    const [genre, setGenre] = useState("");
    const [author, setAuthor] = useState("");
    const [recommendation, setRecommendation] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();

        const response = await fetch("/api/recommendations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                genre: genre,
                author: author
            })
        });

        const data = await response.json();

        if (data.length > 0) {
            setRecommendation(data[0]);
        } else {
            setRecommendation(null);
        }
    }

    return (
        <section>
            <h2>Find a Book</h2>

            <p>
                Choose a genre, enter an author, or choose both.
            </p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="genre">
                    Genre
                </label>

                <select
                    id="genre"
                    value={genre}
                    onChange={(event) => setGenre(event.target.value)}
                >
                    <option value="">
                        Any genre
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

                <label htmlFor="author">
                    Author
                </label>

                <input
                    type="text"
                    id="author"
                    value={author}
                    onChange={(event) => setAuthor(event.target.value)}
                    placeholder="Enter an author"
                />

                <button type="submit">
                    Get Recommendation
                </button>
            </form>

            {recommendation && (
                <div>
                    <h3>We Recommend:</h3>

                    <p>
                        {recommendation.title}
                    </p>

                    <p>
                        By {recommendation.author}
                    </p>

                    <p>
                        Genre: {recommendation.genre}
                    </p>
                </div>
            )}

            {!recommendation && (
                <p>
                    No matching books found.
                </p>
            )}
        </section>
    );
}

export default Recommendation;