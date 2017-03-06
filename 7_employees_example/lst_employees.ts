import { Employee } from "./Employee"

let employees = new Array<Employee>();

employees.push(new Employee("Anartz Mugika", 0));
employees.push(new Employee("Aitor A." , 2));

//Show employees list with data in two differents formats

//1)
for (let emp of employees)
{
    console.log("Employee: " + emp.getName());
}

//2)

employees.forEach(emp =>
{
    console.log("Employee: " + emp.getName());
    document.body.innerHTML = "Employee: " + emp.getName();
})