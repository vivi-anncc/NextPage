import { useState } from "react";

function Recommendation() {
    const [genre, setGenre] = useState("");
    const [author, setAuthor] = useState("");
    const [recommendation, setRecommendation] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();

        const params = new URLSearchParams();

        if (genre) {
            params.append("genre", genre);
        }

        if (author) {
            params.append("author", author);
        }

        const response = await fetch(
            `/api/recommendations?${params.toString()}`
        );

        const data = await response.json();

        if (data.length > 0) {
            const randomIndex = Math.floor(
                Math.random() * data.length
            );

            setRecommendation(data[randomIndex]);
        } else {
            setRecommendation(null);
        }
    }

    return (
        <main className="page recommendation-page">
            <div className="recommendation-container">

                <div className="page-header">
                    <h1>Find Your Next Book</h1>

                    <p>
                        Choose a genre, enter an author, or choose both.
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

                {recommendation ? (
                    <div className="recommendation-result">
                        <h2>
                            We Recommend
                        </h2>

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
                ) : (
                    <div className="no-recommendation">
                        No matching books found.
                    </div>
                )}

            </div>
        </main>
    );
}

export default Recommendation;