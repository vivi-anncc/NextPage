import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Books from "./Books";
import Recommendation from "./Recommendation";
import "./App.css";

function Home() {
    return (
        <main className="home">
            <div className="hero">

                <h1 className="animated-title">
                    {"Next Page".split("").map((letter, index) => (
                        <span
                            key={index}
                            style={{ animationDelay: `${index * 0.06}s` }}
                        >
                            {letter === " " ? "\u00A0" : letter}
                        </span>
                    ))}
                </h1>

                <p className="intro">
                    Keep track of books you have read and find inspirations for new books!
                </p>

                <div className="home-buttons">
                    <Link to="/books" className="button primary">
                        My Books
                    </Link>

                    <Link
                        to="/recommendations"
                        className="button secondary"
                    >
                        Find a Book
                    </Link>
                </div>
            </div>
        </main>
    );
}

function App() {
    return (
        <BrowserRouter>
            <nav className="navbar">
                <Link to="/" className="logo">
                    Next Page
                </Link>

                <div className="nav-links">
                    <Link to="/books">My Books</Link>
                    <Link to="/recommendations">
                        Recommendations
                    </Link>
                </div>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<Books />} />
                <Route
                    path="/recommendations"
                    element={<Recommendation />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;