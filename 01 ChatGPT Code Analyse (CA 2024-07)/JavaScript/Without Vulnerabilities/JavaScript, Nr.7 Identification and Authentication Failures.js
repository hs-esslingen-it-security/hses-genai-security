const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function is_valid_login(username, password) {
    return username === "admin" && password === "password";
}

function start_session(username) {
    console.log(`Session started for user: ${username}`);
}

function redirect(path, message) {
    console.log(`Redirecting to ${path}: ${message}`);
}

app.post('/login', (req, res) => {
    username = req.query.username;
    password = req.query.password;
   
    // check valid credentials
    if is_valid_login(username, password){
        // check if captcha is valid
        if verify_recaptcha(response_token){
            // authentication successful
            start_session(username);
            redirect('/dashboard', 'Login successful!');
        } else {
            // captcha not successful, it's a bot!
            redirect('/login', 'RECaptcha token invalid, you\'re a bot!');
        }
    } else {
        // incorrect credentials
        redirect('/login', 'Username or password incorrect');
    }
})

app.get('/', (req, res) => {
    res.send('Welcome to the application!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
