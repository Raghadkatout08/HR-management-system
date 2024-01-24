let employeeData = [];

let formElemrnt = document.getElementById("form");

function Employee(ID, Name, Dep, level, img) {
    this.EmpId = ID;
    this.FullName = Name;
    this.Department = Dep;
    this.level = level;
    this.ImageURL = img;
    this.salary = null;
    employeeData.push(this);
}

new Employee(1000, "Ghazi Samer", "Administration", "Senior", "./assets/img1.jpg");
new Employee(1001, "Lana Ali", "Finance", "Senior", "./assets/img1.jpg");
new Employee(1002, "Tamara Ayoub", "Marketing", "Senior", "./assets/img1.jpg");
new Employee(1003, "Safi Walid", "Administration", "Mid-Senior", "./assets/img1.jpg");
new Employee(1004, "Omar Zaid", "Development", "Senior", "./assets/img1.jpg");
new Employee(1005, "Rana Saleh", "Development", "Junior", "./assets/img1.jpg");
new Employee(1006, "Hadi Ahmad", "Finance", "Mid-Senior", "./assets/img1.jpg");

console.log(employeeData);


Employee.prototype.calculateSalary = function () {
    if (this.level == "Senior") {
        this.salary = Math.floor(Math.random() * (2000 - 1500 + 1)) + 1500;
    }
    if (this.level == "Mid-Senior") {
        this.salary = Math.floor(Math.random() * (1500 - 1000 + 1)) + 1000;
    }

    if (this.level == "Junior") {
        this.salary = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
    }

    let netSalary = this.salary - (this.salary * (7.5 / 100));
    return netSalary;
}

// Employee.prototype.calculateSalary = function () {
//     let salaryTable =
//     {
//         "Senior":
//         {
//             min: 1500,
//             max: 2000
//         },
//         "Mid-Senior":
//         {
//             min: 1000,
//             max: 1500
//         },
//         "Junior":
//         {
//             min: 500,
//             max: 1000
//         }
//     };

//     let { min, max } = salaryTable[this.Level];

//     this.Salary = Math.floor(Math.random() * (max - min + 1) + min);

//     let taxSalary = 7.5;

//     // let netSalary;

//     this.Salary = this.Salary - (this.Salary * (taxSalary / 100));

//     return this.Salary;

// };

// Employee.prototype.render = function () {
//     // return `${this.FullName} - ${this.netSalary.toFixed(2)}`;
//     console.log(`${this.FullName} - ${this.calculateSalary()}`);

//     // document.write(`<h3 style="text-align: center;"> ${this.FullName} - ${this.calculateSalary()} </h3>`)
//     let divElement = document.getElementById('empsalary');
//     let h3Element = document.createElement('h3');
//     // h3Element.textContent = `${this.FullName} ${this.calculateSalary()}`;
//     // divElement.appendChild(h3Element);
// };


Employee.prototype.render = function () {
    let divElement = document.getElementById('empsalary');
    let h3Element = document.createElement('h3');
    console.log(`${this.FullName} - ${this.calculateSalary()}`);
};

// for(let i=0 ; i<employeeData.length ; i++)
// {
//     employeeData[i].render();
// }

//Lab 08

// create Generate unique four digits employee id number
function generateUniqueNum() {
    return Math.floor(1000 + Math.random() * 9000);
}


Employee.prototype.renderInfo = function () {

    let mainElement = document.getElementById('empInfo');
    let cardElement = document.createElement('div');
    cardElement.classList.add('emp-card');

    this.calculateSalary();

    let contentElement =
        `<img class="emp-img " src="${this.ImageURL}" alt="${this.FullName}">
    <p> ID: ${this.EmpId} </p>
    <div class="emp-det">
    <p> Full Name: ${this.FullName}</p> 
    <p> Department: ${this.Department}</p>
    <p> level: ${this.level}</p>
    <p>${this.calculateSalary()}</p> 
    </div>
    `;

    cardElement.innerHTML = contentElement;
    mainElement.appendChild(cardElement);

    // let h3Element = document.createElement('h3');
    // h3Element.textContent = `(ID: ${this.EmpId} Full Name: ${this.FullName}) (Department: ${this.Department}) (level: ${this.Level})`;
    // mainElement.appendChild(h3Element);

    // console.log(`ID: ${this.EmpId} Full Name: ${this.FullName} //Department: ${this.Department} // level: ${this.Level}`)
};

function separateEmployeesByDepartment() {
    let departmentSections = {};

    employeeData.forEach(employee => {
        if (!departmentSections[employee.Department]) {
            departmentSections[employee.Department] = [];
        }
        departmentSections[employee.Department].push(employee);
    });

    return departmentSections;
}

function renderEmployeesByDepartment() {
    let mainElement = document.getElementById('empInfo');
    mainElement.innerHTML = ''; // Clear previous content

    let departmentSections = separateEmployeesByDepartment();

    for (let department in departmentSections) {
        let sectionElement = document.createElement('section');
        sectionElement.innerHTML = `<br><h2>${department} Department</h2> <br><br>`;
        mainElement.appendChild(sectionElement);

        let employeesInDepartment = departmentSections[department];
        employeesInDepartment.forEach(employee => {
            employee.renderInfo();
        });
    }
}

// display :: 

for (i = 0; i < employeeData.length; i++) {
    employeeData[i].EmpId = generateUniqueNum();
    console.log(`Id for ${employeeData[i].FullName} : ${employeeData[i].EmpId} `)
}
renderEmployeesByDepartment();

for (let i = 0; i < employeeData.length; i++) {
    employeeData[i].render();
    employeeData[i].renderInfo();
}


// function submitHandler(event) {
//     event.preventDefault();
//     let nameEmp = event.target.name.value;
//     let department = event.target.department.value;
//     let level = event.target.level.value;
//     let imgEmp = event.target.image.value;


//     let empId = generateUniqueNum();


//     let newInfoEmp = new Employee(empId, nameEmp, department, level, imgEmp, null)

//     console.log(newInfoEmp);
//     newInfoEmp.renderInfo();

// }

formElemrnt.addEventListener("submit", submitHandler);

function submitHandler(event) {
    event.preventDefault();
    let nameEmp = event.target.name.value;
    let department = event.target.department.value;
    let level = event.target.level.value;
    let imgEmp = event.target.image;

    let empId = generateUniqueNum();

    let newInfoEmp = new Employee(empId, nameEmp, department, level, imgEmp);

    console.log(newInfoEmp);
    newInfoEmp.renderInfo();

}

renderEmployeesByDepartment(); 
