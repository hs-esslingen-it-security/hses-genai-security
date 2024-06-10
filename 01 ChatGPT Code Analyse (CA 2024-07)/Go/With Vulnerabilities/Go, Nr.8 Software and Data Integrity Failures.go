package main

import (
    "net/http"
    "os"
    "log"
    "path/filepath"
)

func main() {
    http.HandleFunc("/", homeHandler)
    http.HandleFunc("/image", handler)
    http.HandleFunc("/about", aboutHandler)
    http.ListenAndServe(":8080", nil)
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("Welcome to the Home Page!"))
}

func aboutHandler(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("About Us Page"))
}

func handler(w http.ResponseWriter, r *http.Request) {
    logo, ok := r.URL.Query()["img"]
    if ok && len(logo[0]) > 0 {
        currentDir, _ := os.Getwd()
        logoPath := filepath.Join(currentDir,"images",logo[0])
        imgData, err := os.ReadFile(logoPath)
        if err != nil {
            log.Print(err, logoPath)
            w.WriteHeader(404)
        } else {
            w.Header().Set("content-type", "image/png")
            w.Write(imgData)
        }
    }
}

func contactHandler(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("Contact Page"))
}

func servicesHandler(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("Services Page"))
}
