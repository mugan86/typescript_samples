"use strict";
exports.__esModule = true;
var Employee = (function () {
    function Employee(name, salary) {
        this.name = name;
        this.salary = salary;
    }
    Employee.prototype.getName = function () {
        return this.name;
    };
    Employee.prototype.toString = function () {
        return "Name: " + this.getName() +
            ", Salary: " + this.salary;
    };
    return Employee;
}());
exports.Employee = Employee;
