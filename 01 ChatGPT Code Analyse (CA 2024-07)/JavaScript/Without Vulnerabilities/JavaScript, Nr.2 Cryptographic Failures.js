const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Body-parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Dummy-Route für die Registrierung (nur als Beispiel)
app.post('/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Hier würde normalerweise die Logik für die Registrierung stehen.
    res.send('Benutzerregistrierung erfolgreich (Dummy-Antwort)');
});

app.post('/login', async (req, res) => {
    const userPassword = req.body.password;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(userPassword, salt);
    res.send('Login erfolgreich (Dummy-Antwort)');
});

// Zusätzliche Dummy-Route für Passwort-Reset
app.post('/reset-password', (req, res) => {
    const email = req.body.email;
    // Hier würde normalerweise die Logik für das Zurücksetzen des Passworts stehen.
    res.send('Passwort-Reset Link gesendet (Dummy-Antwort)');
});

// Server-Start
app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});
