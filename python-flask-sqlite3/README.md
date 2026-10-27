# Local Library: Flask + SQLite

A small server-rendered library app built with [Flask](https://flask.palletsprojects.com/), Jinja2 templates and SQLite (via Python's built-in `sqlite3` module). Favourites are kept in the Flask session.

## Features

- View all authors
- View all books with title, author and genre
- Add a new book
- Update or delete an existing book
- Mark books as favourites (heart icon, kept per session)

## Prerequisites

- Python 3.14 (as set in the `Pipfile`; adjust `python_version` if you use another version)
- [Pipenv](https://pipenv.pypa.io/)

## Getting started

```bash
cd python-flask-sqlite3
pipenv install
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
pipenv run flask run
```

Open <http://localhost:5000>.

Flask reads its settings from `.env` (loaded automatically by Pipenv):

```
FLASK_APP=app.py
FLASK_DEBUG=1
```

Debug mode is on, so the server reloads when files change. Turn it off (`FLASK_DEBUG=0`) for anything other than local development.

The database path is relative (`./db/books.db`), so always start the app from the `python-flask-sqlite3` folder.

## Routes

| Method    | Path                      | Description                            |
| --------- | ------------------------- | -------------------------------------- |
| GET       | `/`                       | Home page                              |
| GET       | `/viewAllAuthors`         | List all authors                       |
| GET       | `/viewAllBooks`           | List all books                         |
| GET, POST | `/addBook`                | Add-book form / create a book          |
| GET, POST | `/updateBook/<book_id>`   | Update form / save changes             |
| POST      | `/deleteBook/<book_id>`   | Delete a book                          |
| GET       | `/addFavourite/<book_id>` | Add a book to the session's favourites |

## Project structure

```
python-flask-sqlite3/
├── app.py              # Flask app, routes and SQLite queries
├── Pipfile             # Dependencies (Flask)
├── Pipfile.lock
├── .env                # FLASK_APP, FLASK_DEBUG, SESSION_SECRET
├── data/books.sql      # Seed data (INSERT statements)
├── static/             # style.css, books.png
└── templates/          # Jinja2 templates
    ├── index.html
    ├── authors.html
    ├── books.html
    ├── add_book.html
    └── update_book.html
```

## Notes

- Heart icons are loaded from a Font Awesome kit over the network, so they need an internet connection to display.
- Favourites live in the session only and are not saved to the database.
- The author and genre dropdowns in the add/update forms are hard-coded. If you add authors or genres to the database, update `add_book.html` and `update_book.html` too.
