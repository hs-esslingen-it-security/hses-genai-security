const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;

let db = new sqlite3.Database('./mydb.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to the application!');
});

app.post('/comments', (req, res) => {
    let comment = req.query.comment;
    let profileid = req.query.profileID;

    // insert comment into database
    db.run(`INSERT INTO comments(comment,profileid) VALUES(?,?)`, [comment, profileid], function(err) {
        if (err) {
            return console.log(err.message);
        }

        // close the database connection
        db.close();
    });
});

// More routes and logic
// ...

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
