#include <crow.h>
#include <libxml/parser.h>

int main() {
  crow::SimpleApp app;

  // Add a route to handle POST requests to /profile/favourite
  CROW_ROUTE(app, "/profile/favourite")
      .methods("POST"_method)([](const crow::request &req) {
        // Initialize libxml2
        xmlInitParser();

        // Parse the XML string with XML_PARSE_NOENT option to allow external
        // entities
        xmlDocPtr doc = xmlReadDoc(
            reinterpret_cast<const xmlChar *>(req.body.c_str()), NULL, NULL, 0);

        // Get the content of the favourite element
        xmlNodePtr favourite = xmlDocGetRootElement(doc);
        std::string value =
            reinterpret_cast<const char *>(xmlNodeGetContent(favourite));

        // Add the item to favorites
        addToFavorites(value);

        // Free memory
        xmlFreeDoc(doc);
        xmlCleanupParser();

        // Return the response
        return crow::response{"Favourite " + value + " saved"};
      });
  app.port(8888).multithreaded().run();
}