const employee_roles = require("./permissions.json");

// function for removing an employee, if you have permission to
const remove_employee = (employee_id, requesting_person) => {
   const role = employee_roles.find( (employee) => employee.name === requesting_person )['role'];

   // check permissions
   if ((role === "developer") || (role === "castle_leader")) {

       var sql = "DELETE FROM employees WHERE ID = ?";
       db.query(sql, [employee_id], function (err, data) {
           if (err) throw err;
       });
      
   }
}