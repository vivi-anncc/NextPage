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

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/api/books", (req, res) => {
    console.log("Books API was called");
    res.json([
        {
            title: "Test 1",
            author: "Test"
        },
        {
            title: "Test 2",
            author: "Test"
        },
        {
            title: "Test 3",
            author: "Test"
        }
    ]);
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

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});