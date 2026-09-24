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

app.post("/api/books", (req, res) => {
    console.log("POST /api/books");
    console.log(req.body);

    res.status(201).json(req.body);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});