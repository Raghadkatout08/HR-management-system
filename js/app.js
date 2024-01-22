let employees = [];

function EmpObj(ID, Name, Dep, Level) {
    this.EmpId = ID;
    this.FullName = Name;
    this.Department = Dep;
    this.Level = Level;
    this.ImageURL = "";
    this.Salary = 0;
    employees.push(this);
}

new EmpObj(1000, "Ghazi Samer"  , "Administration", "Senior"    );
new EmpObj(1001, "Lana Ali"     , "Finance"       , "Senior"    );
new EmpObj(1002, "Tamara Ayoub" , "Marketing"     , "Senior"    );
new EmpObj(1003, "Safi Walid"   , "Administration", "Mid-Senior");
new EmpObj(1004, "Omar Zaid"    , "Development"   , "Senior"    );
new EmpObj(1005, "Rana Saleh"   , "Development"   , "Junior"    );
new EmpObj(1006, "Hadi Ahmad"   , "Finance"       , "Mid-Senior");

console.log(employees);

EmpObj.prototype.calculateSalary = function () {
    const salaryTable =
    {
        "Senior":
        {
            min: 1500,
            max: 2000
        },
        "Mid-Senior":
        {
            min: 1000,
            max: 1500
        },
        "Junior":
        {
            min: 500,
            max: 1000
        }
    };

    const { min, max } = salaryTable[this.Level];

    this.Salary = Math.floor(Math.random() * (max - min + 1) + min);

    const taxSalary = 7.5;

    // let netSalary;

    this.Salary = this.Salary - (this.Salary * (taxSalary / 100));

    return this.Salary;

};

EmpObj.prototype.render = function () {
    // return `${this.FullName} - ${this.netSalary.toFixed(2)}`;
    console.log(`${this.FullName} - ${this.calculateSalary()}`);

    document.write(`<h3 style="text-align: center;"> ${this.FullName} - ${this.calculateSalary()} </h3>`)

};



for(let i=0 ; i<employees.length ; i++)
{
    employees[i].render();
}



// document.addEventListener('DOMContentLoaded', renderEmpInfo);