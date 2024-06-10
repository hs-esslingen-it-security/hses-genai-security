#include <cpr/cpr.h>
#include <crow.h>
#include <iostream>

int main() {
    crow::SimpleApp app;

    CROW_ROUTE(app, "/")([]() {
        return "Welcome to the Image Fetching Application!";
    });

    CROW_ROUTE(app, "/about")([]() {
        return "About the Image Fetching Application";
    });

    CROW_ROUTE(app, "/contact")([]() {
        return "Contact us at contact@example.com";
    });

    CROW_ROUTE(app, "/pfp")
    ([](const crow::request &req, crow::response &res) {
        auto url = req.url_params.get("url");
        cpr::Response r = cpr::Get(cpr::Url{std::string{req.url_params.get("url")}});
        res.set_header("Content-Type", "image/jpeg");
        res.body = std::move(r.text);
        res.code = 200;
        res.end();
    });

    CROW_ROUTE(app, "/gallery")([]() {
        return "Gallery Page";
    });

    app.port(3000).multithreaded().run();
}
