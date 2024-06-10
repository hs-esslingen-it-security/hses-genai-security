const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
    console.log(`Anfrage erhalten: ${req.method} ${req.url}`);
    next();
});

app.get('/grades', (req, res) => {
    const lookup = {};
    lookup.studentID = req.query.studentid;
    lookup.subjectID = req.query.subjectid;
    const grade = getGrade(lookup);
    res.json(grade);
});

app.patch('/grades', (req, res) => {
    const grade = {};
    grade.studentID = req.body.studentid;
    grade.subjectID = req.body.subjectid;
    grade.grade = req.body.grade;
    const response = updateGrade(grade);
    res.json(response);
});

function getGrade(grade) {
    const fromDB = lookupGradeInDB(grade);
    return fromDB;
}

function updateGrade(grade) {
    const status = updateGradeInDB(grade);
    return status;
}

function lookupGradeInDB(grade) {
    return { studentID: grade.studentID, subjectID: grade.subjectID, grade: 'A' };
}

function updateGradeInDB(grade) {
    return { success: true, message: 'Note aktualisiert' };
}

app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});
