#include <cpprest/http_listener.h>
#include <cpprest/json.h>

using namespace web;
using namespace http;
using namespace utility;
using namespace http::experimental::listener;

void handle_get(http_request request) {
    auto grade = json::value::object();
    auto lookup = json::value::object();

    auto uri_query = uri::split_query(request.request_uri().query());

    lookup["studentID"] = json::value::string(uri_query["studentid"]);
    lookup["subjectID"] = json::value::string(uri_query["subjectid"]);

    grade = lookupGradeInDB(lookup);

    request.reply(status_codes::OK, grade);
}

void handle_patch(http_request request) {
    auto update = json::value::object();
    auto response = json::value::object();

    request.extract_json().then([&update](pplx::task<json::value> task) {
        auto jsonBody = task.get();
        update["grade"] = jsonBody.at("grade");
        update["studentID"] = jsonBody.at("studentID");
        update["subjectID"] = jsonBody.at("subjectID");
    }).wait();

    response = updateGradeInDB(update);

    request.reply(status_codes::OK, response);
}

int main() {
    http_listener listener("http://0.0.0.0:443/grades");

    listener.support(methods::GET, handle_get);
    listener.support(methods::PATCH, handle_patch);

    listener.open().wait();
    std::cout << "Server started..." << std::endl;
    std::cout << "Listening on " << listener.uri().to_string() << std::endl;

    while (true);
    return 0;
}