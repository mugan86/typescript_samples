interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName +  " !!!";
}

var user = { firstName: "Anartz", lastName: "Mugika" };

document.body.innerHTML = greeter(user);
