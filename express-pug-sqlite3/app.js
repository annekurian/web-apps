const express = require('express');
const app = express();
const port = 3001;
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/books.db');

app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/viewAllAuthors', (req, res) => {
  db.all('SELECT * from authors', (err, rows) => {
    res.render('viewAllAuthors', { authors: rows });
  });
});

app.get('/viewBooksByAuthor/:authorId/:authorName', (req, res) => {
  const authorId = req.params.authorId;
  const authorName = req.params.authorName;
  db.all(
    'SELECT title from books WHERE author_id = ' + authorId,
    (err, rows) => {
      res.render('viewBooksByAuthor', { books: rows, authorName: authorName });
    }
  );
});

app.get('/viewAllBooks', (req, res) => {
  db.all(
    'SELECT b.id, b.title as title, a.name as author, g.name as genre from books b, authors a, genres g where b.author_id = a.id and b.genre_id = g.id',
    (err, rows) => {
      res.render('viewAllBooks', { books: rows });
    }
  );
});

app
  .route('/addBook')
  .get((req, res) => {
    res.render('addBook');
  })
  .post((req, res) => {
    const { title, author, genre } = req.body;
    db.run(
      'INSERT INTO books (title, author_id, genre_id) VALUES(?,?,?)',
      [title, author, genre],
      function (err) {
        if (err) {
          res.send('Error adding new book: ' + err.message);
        }
        res.send(
          'Book has been added successfully with ID: ' +
            this.lastID +
            '<a href="/"> Home </a>\
          &nbsp &nbsp <a href="/viewAllBooks"> View All Books </a>'
        );
      }
    );
  });

app
  .route('/updateBook/:bookId')
  .get((req, res) => {
    db.get(
      'SELECT * FROM books WHERE id=?',
      [req.params.bookId],
      (err, row) => {
        if (err) {
          res.send('Error updating book details: ' + err.message);
        }
        res.render('updateBook', { book: row });
      }
    );
  })
  .post((req, res) => {
    const { title, author, genre } = req.body;
    db.run(
      'UPDATE books SET title=?, author_id=?, genre_id=? WHERE id=?',
      [title, author, genre, req.params.bookId],
      (err) => {
        if (err) {
          console.log(err.message);
          res.send('Error updating book details: ' + err.message);
        }
        res.send(
          'Book has been updated successfully. <a href="/"> Home </a>\
          &nbsp &nbsp <a href="/viewAllBooks"> View All Books </a>'
        );
      }
    );
  });

app.post('/deleteBook/:bookId/:title', async (req, res) => {
  const { bookId, title } = req.params;
  db.run('DELETE from books where id= ?', bookId, function (err) {
    if (err) {
      res.send('Error deleting product');
    }
    return res.send(
      `<h3>The book "${title}" has been removed successfully <a href='/'>Home</a></h3>`
    );
  });
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
