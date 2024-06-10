package main

import (
    "fmt"
    "golang.org/x/crypto/bcrypt"
    "net/http"
)

func main() {
    // Starten eines einfachen HTTP-Servers
    http.HandleFunc("/signup", signupHandler)
    http.HandleFunc("/login", loginHandler)
    http.ListenAndServe(":8080", nil)
}

func signupHandler(w http.ResponseWriter, r *http.Request) {
    // Dummy-Logik für die Benutzerregistrierung
    fmt.Fprintf(w, "Benutzerregistrierung (Dummy)")
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
    // Parsen des Formulars
    _ = r.ParseForm()

    var password = r.Form.Get("password")
    var passwordBytes = []byte(password)

    hashedPasswordBytes, err := bcrypt.GenerateFromPassword(passwordBytes, bcrypt.MinCost)
    if err != nil {
        fmt.Fprintf(w, "Fehler bei der Passwort-Hash-Erstellung: %s", err)
        return
    }

    // Dummy-Logik für die Authentifizierung
    fmt.Fprintf(w, "Login erfolgreich (Dummy), gehashtes Passwort: %s", string(hashedPasswordBytes))
}
