#include <boost/urls/url.hpp>
#include <curl/curl.h>
#include <iostream>
#include <string>

CURL* initializeCurl() {
    CURL* curl = curl_easy_init();
    if (!curl) {
        std::cerr << "Failed to initialize curl" << std::endl;
        exit(1);
    }
    return curl;
}

void processUrlRequest(const std::string& user_input, CURL* curl) {
    boost::urls::url parsed = boost::urls::url_parse(user_input).value();
    if (parsed.host() == "169.254.169.254") {
        std::cout << "AWS metadata access is blocked" << std::endl;
    } else {
        curl_easy_setopt(curl, CURLOPT_URL, user_input.c_str());
        // more curl options...
        CURLcode res = curl_easy_perform(curl);
        // continue...
    }
}

int main() {
    CURL* curl = initializeCurl();

    std::string user_input = "http://example.com";
    processUrlRequest(user_input, curl);

    curl_easy_cleanup(curl);
    return 0;
}
