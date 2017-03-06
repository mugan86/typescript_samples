export class Employee
{
    private name:string;
    private salary:number;

    constructor (name:string, salary:number)
    {
        this.name = name;
        this.salary = salary;
    }

    getName()
    {
        return this.name;
    }

    toString()
    {
        return "Name: " + this.getName() + 
                ", Salary: " + this.salary;
    }
}