Route::patch('/grades', function () {

    if (getCurrentUser()->role != "teacher"]) {
        $response = array();
        $response['message'] = "Access Denied";
        echo json_encode($response);
        return false;
    }

    $grade = array();
    $grade['studentID'] = $_REQUEST['studentid'];
    $grade['subjectID'] = $_REQUEST['subjectid'];
    $grade['grade'] = $_REQUEST['grade'];
    $response = updateGrade($grade);
    echo json_encode($response);
});