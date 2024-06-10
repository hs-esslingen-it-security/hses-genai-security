<?php
$db = new SQLite3('application.db');

session_start();

function checkPermissions() {
    return isset($_SESSION['username']);
}

function homePage() {
    echo "Welcome to the home page!";
}

$smt = $db->prepare("INSERT INTO comments (user, comment, profile) VALUES (:name, :comment, :profile)");
$smt->bindValue(':name', $_SESSION['username'], SQLITE3_TEXT);
$smt->bindValue(':comment', $_POST['comment'], SQLITE3_TEXT);
$smt->bindValue(':profile', $_POST['profile'], SQLITE3_TEXT);

$smt->execute();

if ($_SERVER['REQUEST_METHOD'] == 'POST' && checkPermissions()) {
} else {
    homePage();
}
