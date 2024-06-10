#include <fstream>
#include <nlohmann/json.hpp>

using json = nlohmann::json;

// Open the permissions file and parse the roles
const json employee_roles = [] {
  std::ifstream fin("./permissions.json");
  return json::parse(fin);
}();

void remove_employee(int employee_id, const std::string& requesting_person) {
  // Return the JSON object of the requesting person
  auto requester = std::find_if(employee_roles.begin(), employee_roles.end(),
                                [&requesting_person](const auto& emp) {
                                  return emp["name"] == requesting_person;
                                });

  // Return early if the requesting person is not found
  if (requester == employee_roles.end()) {
    return;
  }

  // Get the role from the requesting person
  std::string role = requester->at("role");

  // Only allow the roles 'developer' and 'castle_leader' to delete employees
  if (role == "developer" || role == "castle_leader") {
    db.query("DELETE FROM employees WHERE ID = ?", {employee_id},
             [](const auto& err, const auto& data) {
               if (err) throw err;
             });
  }
}