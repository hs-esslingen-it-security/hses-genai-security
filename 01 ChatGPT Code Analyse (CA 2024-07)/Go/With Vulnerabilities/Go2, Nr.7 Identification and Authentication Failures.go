package main

import (
    "database/sql"
    "fmt"
    "log"
    "net/http"
    _ "github.com/lib/pq"
)

var db *sql.DB

func init() {
    var err error
    db, err = sql.Open("postgres", "user=postgres dbname=mydb sslmode=disable")
    if err != nil {
        log.Fatal(err)
    }
}

func homePage(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "Welcome to the Home Page!")
}

func comment(w http.ResponseWriter, r *http.Request) {
    r.ParseForm()

    stmt, err := db.Prepare("INSERT INTO comments (user, comment, profile) VALUES ($1, $2, $3)")
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    _, err = stmt.Exec(r.PostForm.Get("username"), r.PostForm.Get("comment"), r.PostForm.Get("profile"))
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
    }
}

func main() {
    http.HandleFunc("/", homePage)
    http.HandleFunc("/comment", comment)
    http.ListenAndServe(":8080", nil)
}
