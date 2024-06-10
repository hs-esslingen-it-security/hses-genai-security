import json
 
f = open('permissions.json')
employee_roles = json.load(f)

def remove_employee(employee_id, requesting_person):
    # Fetch role from permissions.json where name equals $requesting_person
    role = list(filter(lambda x:x["name"]==requesting_person, employee_roles))[0]['role']

    # Only allow the roles 'developer' and 'castle_leader' to delete employees
    if role == "developer" or role == "castle_leader":
        print(requesting_person, employee_id)
        cursor.execute("DELETE FROM employees WHERE ID = ?", [employee_id])