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
    const result = await pool.query(
        "SELECT * FROM books"
    );

    res.json(result.rows);
});


app.post("/api/books", async (req, res) => {
    const { title, author } = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *",
            [title, author]
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
     const { title, author } = req.body; 
     const result = await pool.query(
         "UPDATE books SET title = $1, author = $2 WHERE id = $3 RETURNING *", [title, author, id] ); res.json(result.rows[0]); });

app.delete("/api/books/:id", async (req, res) => { 
    const { id } = req.params; 
    await pool.query( "DELETE FROM books WHERE id = $1", [id] ); res.sendStatus(204); });



app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

