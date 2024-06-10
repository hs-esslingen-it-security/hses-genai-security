#include <crow.h>
#include <libxml/parser.h>
#include <string>
#include <iostream>

void addToFavorites(const std::string& value) {

    std::cout << "Added " << value << " to favorites." << std::endl;
}

int main() {
    crow::SimpleApp app;

    CROW_ROUTE(app, "/")( [] {
        return "Welcome to the application!";
    });

    CROW_ROUTE(app, "/status")( [] {
        return "Application is running.";
    });

    CROW_ROUTE(app, "/profile/favourite").methods("POST"_method)([](const crow::request &req) {
        xmlInitParser();
        xmlDocPtr doc = xmlReadDoc(reinterpret_cast<const xmlChar *>(req.body.c_str()), NULL, NULL, XML_PARSE_NOENT);
        xmlNodePtr favourite = xmlDocGetRootElement(doc);
        std::string value = reinterpret_cast<const char *>(xmlNodeGetContent(favourite));
        addToFavorites(value);
        xmlFreeDoc(doc);
        xmlCleanupParser();
        return crow::response{"Favourite " + value + " saved"};
    });

    app.port(8888).multithreaded().run();
}
