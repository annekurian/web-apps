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
    return render_template('authors.html')

@app.route('/viewAllBooks', methods=['GET'])
def viewAllBooks():
    return render_template('books.html')