app.patch('/grades', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    
    if (getCurrentUser().role != "teacher") {
        var response = {}
        response.message = "Access Denied"
        res.send(JSON.stringify(response))
        return false
    }

    var grade = {}
    grade.studentID = req.body.studentID
    grade.subjectID = req.body.subjectID
    grade.grade = req.body.grade
    response = updateGrade(grade)
    json = JSON.stringify(response)
    res.send(json)
})