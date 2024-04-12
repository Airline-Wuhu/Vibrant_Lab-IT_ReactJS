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
const StudentTable = () => {
  // add keys to raw data to list in table
  employeesData.forEach((employee) => {
    employee.key = employee.id;
  });

  //   console.log(employeesData);

  return (
    <Table columns={columns} dataSource={employeesData} onChange={onChange} />
  );
};

export default StudentTable;
