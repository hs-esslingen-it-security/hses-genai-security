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
    $success = true;
    $success = processPayment($CCNumber, $expDate, $CVV, $orderNumber);
    $log = array('payment' => $success, 'order' => $_REQUEST['orderNumber']);
    file_put_contents('log.txt', json_encode($log), FILE_APPEND);}

function displayForm() {
}

function displayConfirmation() {
}

?>
