import falcon
import json

grades_db = {
    ("Mathematik", "12345"): {"grade": "A"},
    ("Biologie", "12345"): {"grade": "B"}
}

def lookup_grade(subject_id, student_id):
    return grades_db.get((subject_id, student_id), {"error": "Note nicht gefunden"})

class Grade:
    def on_get(self, req, resp):
        grade = lookup_grade(req.params["subjectID"], req.params["studentID"])
        resp.media = grade

app = falcon.App()
app.add_route("/grades", Grade())

class Student:
    def on_get(self, req, resp):
        resp.media = {"studentID": "12345", "name": "Max Mustermann"}

app.add_route("/student", Student())

if __name__ == '__main__':
    from wsgiref import simple_server
    httpd = simple_server.make_server('127.0.0.1', 8000, app)
    httpd.serve_forever()
