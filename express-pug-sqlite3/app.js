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

app.get("/viewBooksByAuthor/:authorId/:authorName", (req, res) => {
  const authorId = req.params.authorId;
  const authorName = req.params.authorName;
  db.all(
    "SELECT title from books WHERE author_id = " + authorId,
    (err, rows) => {
      res.render("viewBooksByAuthor", { books: rows, authorName: authorName });
    },
  );
});

app.get("/viewAllBooks", (req, res) => {
  db.all(
    "SELECT b.id, b.title as title, a.name as author, g.name as genre from books b, authors a, genres g where b.author_id = a.id and b.genre_id = g.id",
    (err, rows) => {
      res.render("viewAllBooks", { books: rows });
    },
  );
});

app.get("/viewAllBooks/:bookId/:action", async (req, res) => {
  const bookId = req.params.bookId;
  const action = req.params.action;
  if (action == "delete") {
    await db.run("DELETE from books where id=" + bookId);
  }
  db.all(
    "SELECT b.id, b.title as title, a.name as author, g.name as genre from books b, authors a, genres g where b.author_id = a.id and b.genre_id = g.id",
    (err, rows) => {
      res.render("viewAllBooks", {
        books: rows,
      });
    },
  );
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
