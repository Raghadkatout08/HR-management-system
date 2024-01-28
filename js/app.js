'use strict';

let allEmp = [];
let empByDep = {};

let divElement = document.getElementById("empInfo");
let formElement = document.getElementById("form");

function Employee(id, name, department, level, imageurl) {
    this.empId = id;
    this.fullName = name;
    this.departmentEmp = department;
    this.level = level;
    this.imageURL = imageurl;
    this.salry = 0;
    allEmp.push(this);

    if (!empByDep[department]) {
        empByDep[department] = [];
    }

    empByDep[department].push(this);
}

function staticEmp() {
    
        new Employee(1000, "Ghazi Samer", "Administration", "Senior", "./assets/img1.jpg");
        new Employee(1001, "Lana Ali", "Finance", "Senior", "./assets/img1.jpg");
        new Employee(1002, "Tamara Ayoub", "Marketing", "Senior", "./assets/img1.jpg");
        new Employee(1003, "Safi Walid", "Administration", "Mid-Senior", "./assets/img1.jpg");
        new Employee(1004, "Omar Zaid", "Development", "Senior", "./assets/img1.jpg");
        new Employee(1005, "Rana Saleh", "Development", "Junior", "./assets/img1.jpg");
        new Employee(1006, "Hadi Ahmad", "Finance", "Mid-Senior", "./assets/img1.jpg");

}

console.log(allEmp);

Employee.prototype.calculateSalary = function () {
    if (this.level === "Senior") {
        this.salry = Math.floor(Math.random() * (2000 - 1500 + 1)) + 1500;
    }
    if (this.level === "Mid-Senior") {
        this.salry = Math.floor(Math.random() * (1500 - 1000 + 1)) + 1000;
    }
    if (this.level === "Junior") {
        this.salry = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
    }

    let tax = 7.5;

    let netSalary = this.salry - (this.salry * (tax / 100));
    return netSalary;
};

Employee.prototype.generateUniuqeId = function () {
    return Math.floor(1000 + Math.random() * 9000);
};

Employee.prototype.render = function () {
    let cardElement = document.createElement("div");
    cardElement.classList.add("emp-card");

    let contentElement = `
        <img class="emp-img" src="${this.imageURL}" alt="${this.fullName}">
        <p>Name: ${this.fullName} - ID: ${this.empId}</p> 
        <p>Department: ${this.departmentEmp} - Level: ${this.level}</p>
        <p>${this.calculateSalary()}</p>
    `;

    cardElement.innerHTML = contentElement;
    divElement.appendChild(cardElement);
};

function renderEmpByDep(department) {
    let divDepartment = document.createElement("div");
    divDepartment.classList.add("department-section");
    let h2Department = document.createElement("h2");
    h2Department.textContent = department;

    divDepartment.appendChild(h2Department);
    divElement.appendChild(divDepartment);

    empByDep[department].forEach(employee => {
        let cardElement = document.createElement("div");
        cardElement.classList.add("emp-card");

        let contentElement = `
            <img class="emp-img" src="${employee.imageURL}" alt="${employee.fullName}">
            <p>Name: ${employee.fullName} - ID: ${employee.empId}</p> 
            <p>Department: ${employee.departmentEmp} - Level: ${employee.level}</p>
            <p>${employee.calculateSalary()}</p>
        `;

        cardElement.innerHTML = contentElement;
        divDepartment.appendChild(cardElement);
    });
}

function findDepartmentSection(department) {
    let departmentSections = document.querySelectorAll(".department-section h2");
    for (let section of departmentSections) {
        if (section.textContent === department) {
            return section.parentElement; // return the parent div
        }
    }
    return null;
}


// Step 1: create function to save data in LS
function saveData(data) {
    let stringArr = JSON.stringify(data);
    localStorage.setItem("Employees", stringArr);
}

// Step 2: create function to get data from LS
function getData() {
    let retrievedArr = localStorage.getItem("Employees");
    let objArr = JSON.parse(retrievedArr);
    console.log("Array after Parse: " + objArr);

        

        for (let i = 7; i < objArr.length; i++) {
            new Employee(objArr[i].empId, objArr[i].fullName, objArr[i].departmentEmp, objArr[i].level, objArr[i].imageURL);
    
    }

    renderAll();
}

staticEmp();

for (let department in empByDep) {
    renderEmpByDep(department);
}
function renderAll()
{
    for (let i = 0; i < allEmp.length; i++) {
    // allEmp[i].render();
    allEmp[i].render();
}
}

formElement.addEventListener("submit", submitHandler);

function submitHandler(event) {
    event.preventDefault();

    let idEmp = allEmp[0].generateUniuqeId();
    let name = event.target.fName.value;
    let department = event.target.department.value;
    let level = event.target.levelEmp.value;
    let image1 = event.target.imageURL.value;

    let newObject = new Employee(idEmp, name, department, level, image1);

    console.log(newObject);
    // newObject.render();
    saveData(allEmp);

    let departmentSection = findDepartmentSection(department);
    if (!departmentSection) {
        departmentSection = document.createElement("div");
        departmentSection.classList.add("department-section");
        let h2Department = document.createElement("h2");
        h2Department.textContent = department;
        departmentSection.appendChild(h2Department);
        divElement.appendChild(departmentSection);
    }

    let cardElement = document.createElement("div");
    cardElement.classList.add("emp-card");

    let contentElement = `
        <img class="emp-img" src="${newObject.imageURL}" alt="${newObject.fullName}">
        <p>Name: ${newObject.fullName} - ID: ${newObject.empId}</p> 
        <p>Department: ${newObject.departmentEmp} - Level: ${newObject.level}</p>
        <p>${newObject.calculateSalary()}</p>
    `;

    cardElement.innerHTML = contentElement;
    departmentSection.appendChild(cardElement);
}

getData();