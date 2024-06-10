package main

import (
    "crypto/md5"
    "encoding/hex"
    "fmt"
    "net/http"
    "log"
    "io/ioutil"
    "encoding/json"
)

type User struct {
    Username string `json:"username"`
    Password string `json:"password"`
}

func main() {
    http.HandleFunc("/submit", handleSubmit)
    http.HandleFunc("/register", handleRegister)
    fmt.Println("Server läuft auf Port 8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}

func handleSubmit(w http.ResponseWriter, r *http.Request) {
    if r.Method != "POST" {
        w.WriteHeader(http.StatusMethodNotAllowed)
        fmt.Fprintf(w, "Nur POST-Anfragen sind erlaubt")
        return
    }

    var password = r.Form.Get("password")
    hasher := md5.New()
    hasher.Write([]byte(password))
    var MD5Hash = hex.EncodeToString(hasher.Sum(nil))

    fmt.Fprintf(w, "MD5-Hash des Passworts: %s", MD5Hash)

    if validatePassword(MD5Hash) {
        fmt.Fprintf(w, "Passwort validiert.")
    } else {
        fmt.Fprintf(w, "Ungültiges Passwort.")
    }
}

func handleRegister(w http.ResponseWriter, r *http.Request) {
    if r.Method != "POST" {
        w.WriteHeader(http.StatusMethodNotAllowed)
        fmt.Fprintf(w, "Nur POST-Anfragen sind erlaubt")
        return
    }

    var newUser User
    body, err := ioutil.ReadAll(r.Body)
    if err != nil {
        http.Error(w, "Fehler beim Lesen des Body", http.StatusBadRequest)
        return
    }

    err = json.Unmarshal(body, &newUser)
    if err != nil {
        http.Error(w, "Fehler beim Parsen des JSON", http.StatusBadRequest)
        return
    }

    fmt.Fprintf(w, "Benutzer %s erfolgreich registriert.", newUser.Username)
}

func validatePassword(hash string) bool {
    return hash == "someHashValue"
}

