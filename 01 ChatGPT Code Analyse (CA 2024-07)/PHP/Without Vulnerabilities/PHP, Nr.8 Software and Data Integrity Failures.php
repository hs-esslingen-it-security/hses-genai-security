function submit()
{
    $imagesDirectory = "/var/www/html/site.com/images/";
    $imageFileName = $_REQUEST['img'];
    $imagePath = $imagesDirectory . $imageFileName;
    $location = realpath($imagePath);
    header("Content-type: image/jpeg");

    if (is_file($location)) {
        // file exists
        if (strpos($location, $imagesDirectory) === 0) {
            // requested directory begins with our allowed path
            readfile($location);
            return;
        }
    }

    // requested directory does not exist or file does not begin with allowed path
    readfile($imagesDirectory . 'default.jpg');
}