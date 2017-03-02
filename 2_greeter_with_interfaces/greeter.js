function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName + " !!!";
}
var user = { firstName: "Anartz", lastName: "Mugika" };
document.body.innerHTML = greeter(user);
