function renderDepartmentTable() {
    let departmentTables = document.getElementById("departmentTables");
    departmentTables.innerHTML = "";

    let allDepartmentsTable = createTable("All Departments");


    for (let department in empByDep) {
        let totalSalary = 0;
        let totalEmployees = 0;

        empByDep[department].forEach(employee => {
            totalSalary += employee.calculateSalary();
            totalEmployees++;
        });
        let allDepartmentsRow = document.createElement("tr");
        allDepartmentsRow.appendChild(createCell(department));
        allDepartmentsRow.appendChild(createCell(totalEmployees));
        allDepartmentsRow.appendChild(createCell(totalSalary));
        allDepartmentsRow.appendChild(createCell(totalSalary / totalEmployees));

        allDepartmentsTable.appendChild(allDepartmentsRow);
    }

    let tableFooter = document.getElementById("tableFooter");
    tableFooter.innerHTML = "";
    addTableFooter(allDepartmentsTable, allEmp.length, getTotalSalaryForAllDepartments());
    tableFooter.appendChild(allDepartmentsTable);
}

renderDepartmentTable();

//create table for department 
function createTable(department) {
    let table = document.createElement("table");
    table.classList.add("department-table");

    let thead = table.createTHead();
    let headerRow = thead.insertRow();
    let headers = ["Department Name", "# of Employees", "Total Salary", "Average Salary"];

    headers.forEach(headerText => {
        let th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    let tbody = table.createTBody();

    return table;
}

function addTableFooter(table, totalEmployees, totalSalary) {
    let tfoot = table.createTFoot();
    let footerRow = tfoot.insertRow();
    footerRow.appendChild(createCell("Total"));
    footerRow.appendChild(createCell(totalEmployees));
    footerRow.appendChild(createCell(totalSalary));
    footerRow.appendChild(createCell(totalSalary / totalEmployees));
}

function createCell(content) {
    let cell = document.createElement("td");
    cell.textContent = content;
    return cell;
}

function renderTotalSection() {
    let tableFooter = document.getElementById("tableFooter");
    tableFooter.innerHTML = "";
    let totalTable = createTable("Total");
    addTableFooter(totalTable, allEmp.length, getTotalSalaryForAllDepartments());
    tableFooter.appendChild(totalTable);
}

function getTotalSalaryForAllDepartments() {
    let totalSalary = 0;
    for (let department in empByDep) {
        empByDep[department].forEach(employee => {
            totalSalary += employee.calculateSalary();
        });
    }
    return totalSalary;
}

function getAverageSalaryForAllDepartments() {
    let totalSalary = getTotalSalaryForAllDepartments();
    let totalEmployees = allEmp.length;
    return totalEmployees === 0 ? 0 : totalSalary / totalEmployees;
}

function getData() {
    let retrievedArr = localStorage.getItem("Employees");
    if (retrievedArr) {
        let objArr = JSON.parse(retrievedArr);
        allEmp = [];
        empByDep = {};
        objArr.forEach(obj => new Employee(obj.empId, obj.fullName, obj.departmentEmp, obj.level, obj.imageURL));

    }
}



function loadAndRenderData() {
    getData();
    let departmentTables = document.getElementById("departmentTables");
    departmentTables.innerHTML = "";
    renderDepartmentTable();
}

loadAndRenderData();
