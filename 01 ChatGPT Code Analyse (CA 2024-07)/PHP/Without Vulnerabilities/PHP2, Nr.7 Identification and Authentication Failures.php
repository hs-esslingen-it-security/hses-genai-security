function login() {

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $username = $_POST['username'];
    $password = $_POST['password'];

    // check amount of failed login attempts
    if(get_user($_POST['username'])->$login_attempts <= 5) {

        if (auth($username, $password) == true) {
            get_user($_POST['username'])->reset_login_attempts();
            header('Location: /dashboard');
            exit();
        } else {
            echo "Incorrect Credentials Supplied";
            get_user($_POST['username'])->increment_login_attempts();
            header('Location: /login');
            exit();
        }
    } else {
        echo "Too many tries, account locked";
        lock_account($_POST['username']);
        header("Location: /login");
        exit();
    }
}
}