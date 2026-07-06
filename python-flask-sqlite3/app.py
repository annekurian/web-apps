from flask import Flask
from flask import render_template
from flask import request
import sqlite3

app=Flask(__name__)

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
    con=sqlite3.connect("./db/books.db")
    cursor = con.cursor()
    cursor.execute('SELECT b.id, b.title as title, a.name as author, g.name as genre FROM books b, authors a, genres g WHERE b.author_id = a.id AND b.genre_id = g.id')
    results = cursor.fetchall()
    cursor.close()

    return render_template('books.html', books=results)