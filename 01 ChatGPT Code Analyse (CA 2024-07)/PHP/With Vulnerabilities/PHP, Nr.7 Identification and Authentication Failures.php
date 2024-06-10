<?php

function auth($username, $password) {
    return $username === "admin" && $password === "password";
}

function handleGetRequest() {
    echo "Please log in to continue.";
}

function login() {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $username = $_POST['username'];
        $password = $_POST['password'];

        if (auth($username, $password) == true) {
            header('Location: /dashboard');
            exit();
        } else {
            echo "Incorrect Credentials Supplied\n";
            header('Location: /login');
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    login();
} else {
    handleGetRequest();
}
