'use strict'

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
new Employee(1000, "Ghazi Samer", "Administration", "Senior", "./assets/img1.jpg")
new Employee(1001, "Lana Ali", "Finance", "Senior", "./assets/img1.jpg")
new Employee(1002, "Tamara Ayoub", "Marketing", "Senior", "./assets/img1.jpg")
new Employee(1003, "Safi Walid", "Administration", "Mid-Senior", "./assets/img1.jpg")
new Employee(1004, "Omar Zaid", "Development", "Senior", "./assets/img1.jpg")
new Employee(1005, "Rana Saleh", "Development", "Junior", "./assets/img1.jpg")
new Employee(1006, "Hadi Ahmad", "Finance", "Mid-Senior", "./assets/img1.jpg")


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
}

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
    divElement.appendChild(cardElement)
};

function findDepartmentSection(department) {
    let departmentSections = document.querySelectorAll(".department-section h2");
    for (let section of departmentSections) {
        if (section.textContent === department) {
            return section.parentNode;
        }
    }
    return null;
}

function renderEmpByDep(department) {
    let divDepartment = document.createElement("div");
    divDepartment.classList.add("department-section");
    let h2Department = document.createElement("h2");
    h2Department.textContent = department;

    divDepartment.appendChild(h2Department);
    divElement.appendChild(divDepartment);

    if (empByDep[department]) {
        empByDep[department].sort((a, b) => a.empId - b.allEmp);
        
        empByDep[department].forEach(
            employee => {
                employee.render();
            });
    }


}

for (let department in empByDep) {
    renderEmpByDep(department);
}

// for (let i = 0; i < allEmp.length; i++) {
//     allEmp[i].render();
// }

formElement.addEventListener("submit", submitHandler)

function submitHandler(event) {
    event.preventDefault();
    // console.log(event);
    let idEmp = allEmp[0].generateUniuqeId();
    let name = event.target.fName.value;
    let department = event.target.department.value;
    let level = event.target.levelEmp.value;
    let image1 = event.target.imageURL.value;

    // let price = calculateSalary();

    let newObject = new Employee(idEmp, name, department, level, image1);

    console.log(newObject);
    newObject.render();

    let departmentSection = findDepartmentSection(department);
    if (departmentSection) {
        // newObject.render();
        departmentSection.appendChild(divElement.lastChild);
    }

}