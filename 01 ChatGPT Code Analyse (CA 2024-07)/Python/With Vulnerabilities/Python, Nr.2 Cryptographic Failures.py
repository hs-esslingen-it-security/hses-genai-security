from flask import Flask, request, jsonify
import hashlib
import sqlite3

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('user_database.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/register', methods=['POST'])
def register():
    username = request.form['username']
    psw = request.form['password']
    md5_hash = hashlib.md5(psw.encode('utf-8')).hexdigest()  

    conn = get_db_connection()
    conn.execute('INSERT INTO users (username, password) VALUES (?, ?)', 
                 (username, md5_hash))
    conn.commit()
    conn.close()

    return jsonify({"message": "Benutzer erfolgreich registriert"}), 201

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    psw = request.form['password']
    md5_hash = hashlib.md5(psw.encode('utf-8')).hexdigest()  

    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE username = ? AND password = ?', 
                        (username, md5_hash)).fetchone()
    conn.close()

    if user:
        return jsonify({"message": "Erfolgreich eingeloggt"}), 200
    else:
        return jsonify({"message": "Ungültiger Benutzername oder Passwort"}), 401

if __name__ == '__main__':
    app.run(debug=True)
