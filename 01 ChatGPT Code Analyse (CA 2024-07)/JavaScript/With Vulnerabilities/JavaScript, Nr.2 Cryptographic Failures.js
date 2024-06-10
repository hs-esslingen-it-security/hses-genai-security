const express = require('express');
const bodyParser = require('body-parser');
const { createHash } = require('node:crypto');

const app = express();
app.use(bodyParser.json());

let users = {
    "user1": { "password": "5f4dcc3b5aa765d61d8327deb882cf99" }, 
};

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const md5Hash = createHash('md5').update(password).digest('hex');
    if (users[username] && users[username].password === md5Hash) {
        res.send({ message: "Erfolgreich eingeloggt!" });
    } else {
        res.status(401).send({ message: "Ungültiger Benutzername oder Passwort" });
    }
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (users[username]) {
        res.status(400).send({ message: "Benutzername bereits vergeben" });
        return;
    }
    const md5Hash = createHash('md5').update(password).digest('hex');
    users[username] = { password: md5Hash };
    res.send({ message: "Benutzer erfolgreich registriert" });
});

app.get('/users', (req, res) => {
    res.json(users);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
