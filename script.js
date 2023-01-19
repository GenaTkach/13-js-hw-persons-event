// id, firstName, lastName, age
let persons = [];

// Helping indexes
let indexForShowButton = 0;
let indexForStatsButton = 0;

buttonAddNewPerson.onclick = () => {
    // Getting all inputs from HTML
    const inputs = Array.from(document.getElementsByTagName('input'));

    for (let i = 0; i < inputs.length; i++) {
        // Check for unique ID
        if (findPerson(persons, inputs[0]) !== -1) {
            inputs.forEach(i => i.value = '');
            alert("Person with this id already exists");
            return;
        }

        // Check for empty inputs
        if (inputs[i].value === '') {
            // Пробросить ошибку и очистить поля
            inputs.forEach(i => i.value = '');
            alert("Some fields are empty, please enter data");
            return;
        }
    }
    let p = new Person(id.value, fname.value, lname.value, age.value);
    inputs.forEach(i => i.value = '');
    persons.push(p);

    // Index for function buttonShowPersons.onclick()
    indexForShowButton++;
    // Index for function buttonShowStats.onclick()
    indexForStatsButton++;
}

buttonShowPersons.onclick = () => {
    for (let i = persons.length - indexForShowButton; i < persons.length; i++) {
        // Create and append new child
        const li = document.createElement('li');
        let text = document.createTextNode(persons[i].toString());
        li.appendChild(text);
        outputPersons.appendChild(li);
        indexForShowButton--;
    }
}

buttonShowStats.onclick = () => {
    // For calculation
    let ages = persons.map((item) => Number(item.age));
    const avg = ages.reduce((acc, p) => acc + p) / ages.length;

    // Create new child
    const stats = document.createElement('p');
    let text = document.createTextNode(`Min age = ${Math.min(...ages)}, Max age = ${Math.max(...ages)}, Avg age = ${avg.toFixed(1)} `);
    stats.appendChild(text);

    // if stats already in html -> replace it
    if(outputStats.firstElementChild !== null){
        outputStats.replaceChild(stats, outputStats.firstElementChild);
    }
    outputStats.appendChild(stats);
    indexForStatsButton = 0;
}

function Person(id, firstName, lastName, age) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.fullName = function () {
        return `${this.firstName} ${this.lastName}`
    };

    this.toString = function () {
        return `ID: ${this.id}, Full Name: ${this.fullName()}, Age: ${this.age} `;
    }
}

function findPerson(persons, id) {
    return persons.findIndex(p => p.id === id);
}
