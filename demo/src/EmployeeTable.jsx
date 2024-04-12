import { Table, Button, Tag, Badge } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getAllEmployees } from "./client";
import InsertRowForm from "./forms/InsertRowForm";
import { useState } from "react";

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
const EmployeeTable = ({ searchText }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  // const [employeesData, setEmployeesData] = useState([]);
  // const [modifiedData, setModifiedData] = useState([]);
  let employeesData,
    modifiedData = [];
  const fetchEmployees = () => {
    employeesData = getAllEmployees();
    modifiedData = modifyData(employeesData, searchText);
  };
  fetchEmployees();
  // console.log(employeesData);

  return (
    <>
      <InsertRowForm
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        fetchEmployees={fetchEmployees}
      />
      <Table
        columns={columns}
        dataSource={modifiedData}
        title={() => (
          <>
            <Button
              onClick={() => setShowDrawer(!showDrawer)}
              type="primary"
              shape="round"
              icon={<PlusOutlined />}
              size="small"
            >
              Add a new employee
            </Button>
            <br />
            <br />
            <Tag>Number of TOTAL employees</Tag>
            <Badge
              className="site-badge-count"
              count={employeesData.length}
              style={{ backgroundColor: "#52c41a" }}
              showZero={true}
            />
            <br></br>
            <br></br>
            <Tag>Number of FILTERED employees</Tag>
            <Badge
              className="site-badge-count"
              count={modifiedData.length || 0}
              style={{ backgroundColor: "#52c41a" }}
              showZero={true}
            />
          </>
        )}
        onChange={onChange}
      />
    </>
  );
};

export default EmployeeTable;
