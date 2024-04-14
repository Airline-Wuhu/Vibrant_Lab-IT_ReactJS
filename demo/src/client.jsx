// this file mimic the api calls to backend apis
// all method returns a promise to mimic the results from backend

const delayTimeLapse = 1500; 
// this is a variable to mimic the delay from backend(in ms)

let fakeDataBase = [
  {
    id: 1,
    name: "John Doe",
    position: "Software Engineer",
    department: "Engineering",
    age: 30,
    salary: 80000,
    experience: 5,
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "UI/UX Designer",
    department: "Design",
    age: 28,
    salary: 70000,
    experience: 4,
  },
  {
    id: 3,
    name: "Michael Johnson",
    position: "Product Manager",
    department: "Product Management",
    age: 35,
    salary: 100000,
    experience: 7,
  },
  {
    id: 4,
    name: "Emily Brown",
    position: "Marketing Specialist",
    department: "Marketing",
    age: 32,
    salary: 75000,
    experience: 6,
  },
  {
    id: 5,
    name: "William Taylor",
    position: "Data Analyst",
    department: "Analytics",
    age: 27,
    salary: 65000,
    experience: 3,
  },
];

export const getAllEmployees = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (fakeDataBase) {
          resolve(fakeDataBase);
        } else {
          reject("Fake database is not available.");
        }
      } catch (error) {
        reject(error);
      }
    }, delayTimeLapse);
  });
};

export const addNewEmployee = (newEmployee) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if the employee ID is already taken
      if (fakeDataBase.some((employee) => employee.id === newEmployee.id)) {
        reject("Employee ID taken! Please try a new ID.");
      } else {
        setTimeout(() => {
          fakeDataBase = fakeDataBase.concat(newEmployee);
          resolve();
        }, delayTimeLapse);
      }
    });
  }, delayTimeLapse);
};

export const deleteEmployee = (employeeId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!fakeDataBase.find((employee) => employee.id === employeeId)) {
        reject("Employee ID not found!");
      } else {
        fakeDataBase = fakeDataBase.filter(
          (employee) => employee.id !== employeeId
        );
        resolve();
      }
    }, delayTimeLapse);
  });
};

export const updateEmployee = (updatedEmployee) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        !fakeDataBase.some((employee) => employee.id === updatedEmployee.id)
      ) {
        reject("Employee ID not found!");
      } else {
        fakeDataBase.forEach((employee) => {
          if (employee.id === updatedEmployee.id) {
            Object.assign(employee, updatedEmployee);
          }
        });
        resolve();
      }
    }, delayTimeLapse);
  });
};
