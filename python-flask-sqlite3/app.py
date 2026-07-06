from flask import Flask
from flask import render_template
from flask import request
import sqlite3

app=Flask(__name__)

@app.route('/')
def index():
  return render_template('index.html')