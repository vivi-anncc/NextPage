import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Books from "./Books";
import Recommendation from "./Recommendation";

function App() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/books">My Books</Link>
                <Link to="/recommendations">Recommendations</Link>
            </nav>

            <Routes>
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