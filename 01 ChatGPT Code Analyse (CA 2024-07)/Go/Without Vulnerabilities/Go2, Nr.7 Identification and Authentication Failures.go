func login(w http.ResponseWriter, r * http.Request) {
    r.ParseForm()
    username: = r.PostForm.Get("username")
    password: = r.PostForm.Get("password")

    if (loginAttempts(username) <= 5) {
        if auth(username, password) == true {
            resetLoginAttempts(username)
            http.Redirect(w, r, "/dashboard", http.StatusSeeOther)
        } else {
            increaseLoginAttempts()
            fmt.Fprint(w, "Incorrect Credentials Supplied")
            http.Redirect(w, r, "/login", http.StatusSeeOther)
        }
    } else {
        lockAccount(username)
        fmt.Fprint(w, "Your account has been locked out")
        http.Redirect(w, r, "/login", http.StatusSeeOther)
    }
}