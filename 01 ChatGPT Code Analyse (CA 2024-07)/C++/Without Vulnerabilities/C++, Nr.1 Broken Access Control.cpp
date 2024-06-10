void handle_patch(http_request request) {
    auto current_user = getCurrentUser(); 
    if (!current_user) {
        request.reply(status_codes::Unauthorized);
        return;
    }

    auto update = json::value::object();
    auto response = json::value::object();

    request.extract_json().then([&update](pplx::task<json::value> task) {
        auto jsonBody = task.get();
        update["grade"] = jsonBody.at("grade");
        update["studentID"] = jsonBody.at("studentID");
        update["subjectID"] = jsonBody.at("subjectID");
    }).wait();

    if (current_user.role != "teacher") {
        request.reply(status_codes::Forbidden);
        return;
    }

    response = updateGradeInDB(update);

    request.reply(status_codes::OK, response);
}