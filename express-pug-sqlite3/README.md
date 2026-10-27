# Local Library: Express + Pug + SQLite

A small server-rendered library app built with [Express 5](https://expressjs.com/), [Pug](https://pugjs.org/) templates and SQLite (via the `sqlite3` package). Favourites are kept in the user session with `express-session`.

## Features

- View all authors, and click an author to see their books
- View all books with title, author and genre
- Add a new book
- Update or delete an existing book
- Mark books as favourites (heart icon, kept per session)

## Prerequisites

- A recent Node.js LTS release (Express 5 requires Node 18 or newer) and npm

## Getting started

```bash
cd express-pug-sqlite3
npm install
```

### Database setup

The `db/` folder is git-ignored, so on a fresh clone you need to create `db/books.db` yourself. If `db/books.db` already exists, skip this step.

```bash
mkdir -p db
sqlite3 db/books.db <<'SQL'
CREATE TABLE authors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  intro TEXT
);
CREATE TABLE genres (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
);
CREATE TABLE books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  author_id INTEGER REFERENCES authors(id),
  genre_id INTEGER REFERENCES genres(id)
);
SQL
sqlite3 db/books.db < data/books.sql
```

This requires the `sqlite3` command-line tool. `data/books.sql` only contains the seed `INSERT` statements, not the table definitions, which is why the schema is created first.

### Run the app

```bash
npm start
```

Open <http://localhost:3001>.

`npm start` runs `node --watch app.js`, so the server restarts automatically when files change.

## Scripts

| Command | What it does |
| --- | --- |
| `npm start` | Start the server with file watching on port 3001 |
| `npm run format` | Format the project with Prettier |

## Routes

| Method | Path | Description |
| --- | --- | --- |
| GET | `/` | Home page |
| GET | `/viewAllAuthors` | List all authors |
| GET | `/viewBooksByAuthor/:authorId/:authorName` | Books by one author |
| GET | `/viewAllBooks` | List all books |
| GET | `/addBook` | Add-book form |
| POST | `/addBook` | Create a book |
| GET | `/updateBook/:bookId` | Update form for a book |
| POST | `/updateBook/:bookId` | Save changes to a book |
| POST | `/deleteBook/:bookId/:title` | Delete a book |
| POST | `/addFavourite/:bookId` | Add a book to the session's favourites |

## Project structure

```
express-pug-sqlite3/
├── app.js              # Express app, routes and SQLite queries
├── package.json
├── data/books.sql      # Seed data (INSERT statements)
├── db/books.db         # SQLite database (git-ignored)
├── public/             # Static files: style.css, books.png
└── views/              # Pug templates
    ├── index.pug
    ├── viewAllAuthors.pug
    ├── viewBooksByAuthor.pug
    ├── viewAllBooks.pug
    ├── addBook.pug
    └── updateBook.pug
```

## Notes

- The port (`3001`) and session secret are hard-coded in `app.js`.
- Heart icons are loaded from a Font Awesome kit over the network, so they need an internet connection to display.
- Favourites live in the session only and are not saved to the database.
- The author and genre dropdowns in the add/update forms are hard-coded. If you add authors or genres to the database, update `addBook.pug` and `updateBook.pug` too.
