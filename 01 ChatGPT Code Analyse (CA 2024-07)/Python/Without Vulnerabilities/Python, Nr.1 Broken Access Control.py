def on_patch(self, req, resp):
    if get_user_role(session) == "teacher":
        self.studentID = req.params["studentID"]
        self.subjectID = req.params["subjectID"]
        self.grade = req.params["grade"]
        resp.media = "Success"
        return
    else:
        resp.media = "Access Denied"
        return