// import fetch from "unfetch";

// const checkStatus = response => {
//     if (response.ok) {
//         return response;
//     }
//     // return error
//     const error = new Error(response.statusText);
//     error.response = response;
//     return Promise.reject(error);
// }

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
    try {
      if (fakeDataBase) {
        resolve(fakeDataBase); // Resolve with the fakeDataBase
      } else {
        reject("Fake database is not available."); // Reject with an error message
      }
    } catch (error) {
      reject(error); // Reject with the caught error
    }
  });
};

export const addNewEmployee = (newEmployee) => {
  if (fakeDataBase.some((employee) => employee.id === newEmployee.id))
    return Promise.reject("Employee ID taken! Please try a new ID.");
  fakeDataBase = fakeDataBase.concat(newEmployee);
  return Promise.resolve(); // Return a resolved Promise
};

export const deleteEmployee = (employeeId) => {
  if (!fakeDataBase.find((employee) => employee.id === employeeId))
    return Promise.reject("Employee ID not found!");
  fakeDataBase = fakeDataBase.filter((employee) => employee.id != employeeId);
  return Promise.resolve(); // Return a resolved Promise
};
export const updateEmployee = (updatedEmployee) => {
  if (!fakeDataBase.some((employee) => employee.id === updatedEmployee.id))
    return Promise.reject("Employee ID not found!");
  fakeDataBase.forEach((employee) => {
    if (employee.id === updatedEmployee.id)
      Object.assign(employee, updatedEmployee);
  });
  console.log(fakeDataBase);
  return Promise.resolve(); // Return a resolved Promise
};
