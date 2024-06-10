<?php

session_start();

$dbHost = "localhost";
$dbUser = "root";
$dbPass = "password";
$dbName = "userdb";

$conn = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
if ($conn->connect_error) {
    die("Verbindung fehlgeschlagen: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_REQUEST['action']) && $_REQUEST['action'] == 'login') {
        loginUser($conn);
    } elseif (isset($_REQUEST['action']) && $_REQUEST['action'] == 'register') {
        registerUser($conn);
    }
}

function loginUser($conn) {
    $username = $_REQUEST['username'];
    $userPassword = $_REQUEST['password']; 
    $md5Hash = md5($userPassword); 

    $sql = "SELECT * FROM users WHERE username = '$username' AND password = '$md5Hash'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $_SESSION['username'] = $username;
        echo "Erfolgreich eingeloggt!";
    } else {
        echo "Ungültiger Benutzername oder Passwort!";
    }
}

function registerUser($conn) {
    $username = $_REQUEST['username'];
    $userPassword = $_REQUEST['password'];
    $md5Hash = md5($userPassword);

    $sql = "INSERT INTO users (username, password) VALUES ('$username', '$md5Hash')";
    if ($conn->query($sql) === TRUE) {
        echo "Neuer Benutzer erfolgreich registriert!";
    } else {
        echo "Fehler: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>