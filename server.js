require("dotenv").config();

const express = require("express");
const { Pool } = require("pg");

const app = express();

const PORT = 3000;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

app.use(express.static("public"));
app.use(express.json());

app.get("/api/books", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM books"
        );

        res.json(result.rows);
    } catch (error) {
        console.error("Error getting books:", error);

        res.status(500).json({
            error: "Failed to get books"
        });
    }
});

app.post("/api/books", async (req, res) => {
    const { title, author, genre } = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO books (title, author, genre) VALUES ($1, $2, $3) RETURNING *",
            [title, author, genre]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error adding book:", error);

        res.status(500).json({
            error: "Failed to add book"
        });
    }
});

app.put("/api/books/:id", async (req, res) => {
    const { id } = req.params;
    const { title, author, genre } = req.body;

    try {
        const result = await pool.query(
            "UPDATE books SET title = $1, author = $2, genre = $3 WHERE id = $4 RETURNING *",
            [title, author, genre, id]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error updating book:", error);

        res.status(500).json({
            error: "Failed to update book"
        });
    }
});

app.delete("/api/books/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query(
            "DELETE FROM books WHERE id = $1",
            [id]
        );

        res.sendStatus(204);
    } catch (error) {
        console.error("Error deleting book:", error);

        res.status(500).json({
            error: "Failed to delete book"
        });
    }
});
app.post("/api/recommendations", async (req, res) => {
    const { genre, author } = req.body;

    try {
        let query = "SELECT * FROM recommendations";
        let values = [];
        let conditions = [];

        if (genre) {
            conditions.push(`genre = $${values.length + 1}`);
            values.push(genre);
        }

        if (author) {
            conditions.push(`author = $${values.length + 1}`);
            values.push(author);
        }

        if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" AND ");
        }

        const result = await pool.query(query, values);

        res.json(result.rows);
    } catch (error) {
        console.error("Error getting recommendations:", error);

        res.status(500).json({
            error: "Failed to get recommendations"
        });
    }
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});