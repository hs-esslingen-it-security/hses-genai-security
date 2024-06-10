<?php

class ImageHandler {

    public function index() {
        echo "Welcome to the Image Handling Application!";
    }

    public function show($imageName) {
        $imagesDirectory = "/images/";
        $imagePath = $imagesDirectory . $imageName;
    }

    public function submit() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $imagesDirectory = "/images/";
            $imageFileName = $_REQUEST['img'];
            $imagePath = $imagesDirectory . $imageFileName;
            include($imagePath);
        }
    }

    public function about() {
        echo "About the Image Handling Application";
    }

    public function contact() {
        echo "Contact us for more information";
    }

    private function validateImage($imageName) {
    }
}

$handler = new ImageHandler();
$handler->index();
$handler->submit(); 
