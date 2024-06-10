<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {

    Route::get('/grades', function () {
        $lookup = array();
        $lookup['studentID'] = $_REQUEST['studentid'];
        $lookup['subjectID'] = $_REQUEST['subjectid'];
        $grade = getGrade($lookup);
        echo json_encode($grade);
    });

    Route::patch('/grades', function () {
        $grade = array();
        $grade['studentID'] = $_REQUEST['studentid'];
        $grade['subjectID'] = $_REQUEST['subjectid'];
        $grade['grade'] = $_REQUEST['grade'];
        $response = updateGrade($grade);
        echo json_encode($response);
    });

    Route::get('/students', function () {
    });

    Route::post('/students', function () {
    });
});

function getGrade($grade) {
    $fromDB = lookupGradeInDB($grade);
    return $fromDB;
}

function updateGrade($grade) {
    $status = updateGradeInDB($grade);
    return $status;
}

function lookupGradeInDB($grade) {
    return ['studentID' => $grade['studentID'], 'subjectID' => $grade['subjectID'], 'grade' => 'A'];
}

function updateGradeInDB($grade) {
    return ['success' => true, 'message' => 'Note aktualisiert'];
}

?>