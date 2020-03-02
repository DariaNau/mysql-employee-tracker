class Employee {
    constructor(id, firstName, lastName, roleID, managerID) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleID = roleID;
        this.managerID = managerID;
    }
}

module.exports = Employee;