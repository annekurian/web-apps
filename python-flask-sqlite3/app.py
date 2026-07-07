from flask import Flask, session, redirect, url_for
from flask import render_template
from flask import request
import sqlite3

app=Flask(__name__)
app.secret_key="local library"

@app.context_processor
def inject_favourites():
   favourites = session.get('favourites',[])
   return dict(favourites=favourites)

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/viewAllAuthors', methods=['GET'])
def viewAllAuthors():
    con=sqlite3.connect("./db/books.db")
    cursor = con.cursor()
    cursor.execute('SELECT * from authors')
    results = cursor.fetchall()
    cursor.close()

    return render_template('authors.html', authors=results)

@app.route('/viewAllBooks', methods=['GET'])
def viewAllBooks():
    if 'favourites' not in session:
      session['favourites'] = []
    con=sqlite3.connect("./db/books.db")
    cursor = con.cursor()
    cursor.execute('SELECT b.id, b.title as title, a.name as author, g.name as genre FROM books b, authors a, genres g WHERE b.author_id = a.id AND b.genre_id = g.id')
    results = cursor.fetchall()
    cursor.close()

    return render_template('books.html', books=results)

@app.route('/addBook', methods=['GET','POST'])
def addBook():
   if request.method == 'GET':
      return render_template('add_book.html')
   elif request.method == 'POST':
      title = request.form['title']
      author = request.form['author']        
      genre = request.form['genre']

      conn = sqlite3.connect('./db/books.db')
      cursor = conn.cursor()
      cursor.execute('INSERT INTO books (title, author_id, genre_id) VALUES ( ?, ?, ?)', (title, author, genre))
      conn.commit()
      conn.close()

      return '''Book added succesfully with ID: {} 
            <a href="/">Home</a> &nbsp &nbsp <a href="/viewAllBooks">View All Books</a>
            '''.format(cursor.lastrowid)
  
@app.route('/updateBook/<book_id>', methods=['GET', 'POST'])
def updateBook(book_id):
  if request.method == 'GET':
    conn = sqlite3.connect('./db/books.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM books WHERE id = ?', (book_id,))
    book = cursor.fetchone()
    conn.close()

    return render_template('update_book.html', book=book)
  
  elif request.method == 'POST':
    title = request.form['title']
    author = request.form['author']        
    genre = request.form['genre']
    conn = sqlite3.connect('./db/books.db')
    cursor = conn.cursor()
    cursor.execute('UPDATE books SET title=?, author_id=?, genre_id=? WHERE id=?', (title, author, genre, book_id,))
    conn.commit()
    conn.close()

    return '''The book has been updated successfully 
    <a href="/">Home</a> &nbsp &nbsp <a href="/viewAllBooks">View All Books</a>'''

@app.route('/deleteBook/<book_id>', methods=['POST'])
def deleteBook(book_id):
  conn = sqlite3.connect('./db/books.db')
  cursor = conn.cursor()
  cursor.execute('DELETE FROM books WHERE id = ?', (book_id,))
  conn.commit()
  conn.close()

  return '''The book has been removed successfully 
  <a href="/">Home</a> &nbsp &nbsp <a href="/viewAllBooks">View All Books</a>'''

@app.route('/addFavourite/<book_id>')
def addFavourite(book_id):
    if 'favourites' not in session:
      session['favourites'] = []
    if book_id not in session['favourites']:
      session['favourites'].append(book_id)
      session.modified=True

    return redirect(url_for('viewAllBooks'))