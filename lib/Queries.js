class ORM {
    //if this doesn't work the way we think it will, maybe our methods should take in a connection parameter instead of requiring connection.js
    insertEmployee(connection, employee) {
        const query = connection.query(
            "INSERT INTO employee SET ?", {
                first_name: employee.firstName,
                last_name: employee.lastName,
                role_id: employee.roleID,
                manager_id: employee.managerID
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " new employee inserted!\n");
            });
    }
}

module.exports = ORM;