"use strict";
exports.__esModule = true;
var Employee_1 = require("./Employee");
var employees = new Array();
employees.push(new Employee_1.Employee("Anartz Mugika", 0));
employees.push(new Employee_1.Employee("Aitor A.", 2));
//Show employees list with data in two differents formats
//1)
for (var _i = 0, employees_1 = employees; _i < employees_1.length; _i++) {
    var emp = employees_1[_i];
    console.log("Employee: " + emp.getName());
}
//2)
employees.forEach(function (emp) {
    console.log("Employee: " + emp.getName());
    document.body.innerHTML = "Employee: " + emp.getName();
});
