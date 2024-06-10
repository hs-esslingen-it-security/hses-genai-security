<?php
 
function login() {
 
    // Set up recaptcha data keys and URLs here
 
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
 
        $username = $_POST['username'];
        $password = $_POST['password'];
 
        // Check RECaptcha
        $response_json = check_recaptcha($_POST['recaptcha_response']);
 
        // If successful, and score is greater than 0.5, continue with login
        if($response_json->success == true && $response_json->score>=0.5){
            if (auth($username, $password) == true) {
                header('Location: /dashboard');
                exit();
            } else {
                echo "Incorrect Credentials Supplied";
                header('Location: /login');
                exit();
            }
        } else {
            echo "You're a bot";
            header("Location: /login");
            exit();
        }
    }
}
?>