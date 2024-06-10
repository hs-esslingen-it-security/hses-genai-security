<?php

function initializeApplication() {
    echo "Application is initializing...\n";
}

function validateInput($input) {
    return isset($input) && !empty($input);
}

function main() {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if (isset($_GET['action'])) {
            switch ($_GET['action']) {
                case 'greet':
                    greetUser();
                    break;
            }
        }
    }
}

function greetUser() {
    $name = $_GET['name'];
    eval('echo "Hi there, " . strtoupper("'.$name.'");');
}

initializeApplication();
main();

?>
