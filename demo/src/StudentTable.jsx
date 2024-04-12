import { Table } from "antd";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Position",
    dataIndex: "position",
  },
  {
    title: "Department",
    dataIndex: "department",
  },
  {
    title: "Age",
    dataIndex: "age",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Salary",
    dataIndex: "salary",
    sorter: (a, b) => a.salary - b.salary,
  },
  {
    title: "Experience",
    dataIndex: "experience",
    sorter: (a, b) => a.experience - b.experience,
  },
];
const employeesData = [
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
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const modifyData = (employeesData, filterWord) => {
  // add keys to raw data to list in table
  employeesData.forEach((employee) => {
    employee.key = employee.id;
  });
  //   console.log("added keys: ", employeesData);

  // filter the data using the filter word, if the filter word is blank, skip it
  if (filterWord) {
    //create regular expression pattern to match the filterWord, case insensitive
    var re = new RegExp(".*" + filterWord + ".*", "i");
    // console.log("the regular expression: ", re);
    const updatedData = employeesData.filter((employee) =>
      Object.values(employee).some((value) => re.test(String(value)))
    );
    // console.log("filter: ", filterWord, "after filter: ", data);
    return updatedData;
  }

  return employeesData;
};
const StudentTable = ({ searchText }) => {
  const modifiedData = modifyData(employeesData, searchText);
  // console.log(employeesData);

  return (
    <Table columns={columns} dataSource={modifiedData} onChange={onChange} />
  );
};

export default StudentTable;
