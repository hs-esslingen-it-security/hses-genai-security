<?php

function processPayment($CCNumber, $expDate, $CVV, $orderNumber) {
    return true;
}

function logPayment($success, $postData) {
    echo "Payment processed. Success: " . $success;
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    echo "Welcome to the Payment Processing Application!";
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $CCNumber = $_POST['cc'];
    $expDate = $_POST['expDate'];
    $CVV = $_POST['CVV'];
    $orderNumber = $_POST['orderNumber'];

    $success = processPayment($CCNumber, $expDate, $CVV, $orderNumber);
    logPayment($success, $_POST);
}

function displayForm() {
}

function displayConfirmation() {
}

?>
