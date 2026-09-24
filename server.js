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


// BOOKS

app.get("/api/books", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM books ORDER BY id DESC"
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
    const {
        title,
        author,
        genre,
        started_reading
    } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO books
                (title, author, genre, started_reading)
             VALUES
                ($1, $2, $3, $4)
             RETURNING *`,
            [
                title,
                author,
                genre,
                started_reading || null
            ]
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

    const {
        title,
        author,
        genre,
        started_reading
    } = req.body;

    try {
        const result = await pool.query(
            `UPDATE books
             SET title = $1,
                 author = $2,
                 genre = $3,
                 started_reading = $4
             WHERE id = $5
             RETURNING *`,
            [
                title,
                author,
                genre,
                started_reading || null,
                id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Book not found"
            });
        }

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
        const result = await pool.query(
            `DELETE FROM books
             WHERE id = $1
             RETURNING *`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Book not found"
            });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error("Error deleting book:", error);

        res.status(500).json({
            error: "Failed to delete book"
        });
    }
});


// RECOMMENDATIONS

app.get("/api/recommendations", async (req, res) => {
    const { genre, author } = req.query;

    try {
        let query =
            "SELECT * FROM recommendations WHERE 1=1";

        const values = [];

        if (genre) {
            values.push(genre);
            query += ` AND genre = $${values.length}`;
        }

        if (author) {
            values.push(`%${author}%`);
            query += ` AND author ILIKE $${values.length}`;
        }

        query += " ORDER BY RANDOM()";

        const result = await pool.query(
            query,
            values
        );

        res.json(result.rows);
    } catch (error) {
        console.error(
            "Error getting recommendations:",
            error
        );

        res.status(500).json({
            error: "Failed to get recommendations"
        });
    }
});


// START SERVER

app.listen(PORT, () => {
    console.log(
        `Server running at http://localhost:${PORT}`
    );
});