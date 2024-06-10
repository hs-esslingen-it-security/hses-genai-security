app.post('/login', (req, res) => {
    const MAX_FAILED_LOGINS = 5;
    username = req.query.username;
    password = req.query.password;
   
    // If there has been too many logins, send a forbidden response
    if (get_user_from_username(username).failed_login_count >= MAX_FAILED_LOGINS) {

        res.send(403,"Account locked due to too many failed login attempts, contact support.");
    }

    // check valid credentials
    if (is_valid_login(username, password)){
        // authentication successful, reset counter and login
        reset_failed_login_counter(username);
        start_session(username);
        redirect('/dashboard', 'Login successful!');
    } else {
        // incorrect credentials, increment failed login counter
        increment_failed_login_counter(username);
        redirect('/login', 'Username or password incorrect');
    }
})