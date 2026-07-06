const express = require("express");
const app = express();
const port = 3001;
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/books.db");

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/viewAllAuthors", (req, res) => {
  db.all("SELECT * from authors", (err, rows) => {
    res.render("viewAllAuthors", { authors: rows });
  });
});

app.get("/viewAllBooks", (req, res) => {
  res.render("viewAllBooks");
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
