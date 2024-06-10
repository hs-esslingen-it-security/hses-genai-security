package main

import (
    "fmt"
    "net/http"
)

func auth(username, password string) bool {
    return username == "admin" && password == "password"
}

func home(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "Welcome to the Application!")
}

func login(w http.ResponseWriter, r *http.Request) {
    r.ParseForm()
    username := r.PostForm.Get("username")
    password := r.PostForm.Get("password")

    if auth(username, password) {
        http.Redirect(w, r, "/dashboard", http.StatusSeeOther)
    } else {
        fmt.Fprint(w, "Incorrect Credentials Supplied")
        http.Redirect(w, r, "/login", http.StatusSeeOther)
    }
}

func dashboard(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "Welcome to the Dashboard!")
}

func main() {
    http.HandleFunc("/", home)
    http.HandleFunc("/login", login)
    http.HandleFunc("/dashboard", dashboard)
    http.ListenAndServe(":8080", nil)
}
