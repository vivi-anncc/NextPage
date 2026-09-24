
import { useState } from "react";

function Recommendation() {
    const [genre, setGenre] = useState("");
    const [author, setAuthor] = useState("");
    const [recommendation, setRecommendation] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        setHasSearched(true);
        setRecommendation(null);
        setError("");

        if (!genre && !author.trim()) {
            setError(
                "Please select a genre or enter an author."
            );
            return;
        }

        try {
            const params = new URLSearchParams();

            if (genre) {
                params.append("genre", genre);
            }

            if (author.trim()) {
                params.append("author", author.trim());
            }

            const response = await fetch(
                `/api/recommendations?${params.toString()}`
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error ||
                    "Failed to get recommendations."
                );
            }

            if (data.length > 0) {
                setRecommendation(data[0]);
            } else {
                setRecommendation(null);
            }
        } catch (error) {
            console.error(
                "Recommendation error:",
                error
            );

            setError(
                "Something went wrong. Please try again."
            );
        }
    }

    return (
        <main className="page recommendation-page">
            <div className="recommendation-container">

                <div className="page-header">
                    <h1>Find Your Next Book</h1>

                    <p>
                        Choose a genre, enter an author,
                        or choose both.
                    </p>
                </div>

                <form
                    className="recommendation-form"
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="genre">
                        Genre
                    </label>

                    <select
                        id="genre"
                        value={genre}
                        onChange={(event) =>
                            setGenre(event.target.value)
                        }
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
                        onChange={(event) =>
                            setAuthor(event.target.value)
                        }
                        placeholder="Enter an author"
                    />

                    <button type="submit">
                        Get Recommendation
                    </button>
                </form>

                {error && (
                    <div className="no-recommendation">
                        {error}
                    </div>
                )}

                {hasSearched &&
                    !recommendation &&
                    !error && (
                        <div className="no-recommendation">
                            No matching books found.
                        </div>
                    )}

                {recommendation && (
                    <div className="recommendation-result">
                        <h2>We Recommend</h2>

                        <h3>
                            {recommendation.title}
                        </h3>

                        <p>
                            By {recommendation.author}
                        </p>

                        <p>
                            Genre: {recommendation.genre}
                        </p>
                    </div>
                )}

            </div>
        </main>
    );
}

export default Recommendation;

