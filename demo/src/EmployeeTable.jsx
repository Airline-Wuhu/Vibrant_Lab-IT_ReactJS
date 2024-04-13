import { Table, Button, Tag, Badge, Popconfirm, Radio } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getAllEmployees } from "./client";
import InsertRowForm from "./forms/InsertRowForm";
import { useState, useEffect } from "react";
import { deleteEmployee } from "./client";
import {
  successNotificationWithIcon,
  errorNotificationWithIcon,
} from "./forms/Notification";

const removeEmployee = (employID, callback) => {
  deleteEmployee(employID)
    .then(() => {
      successNotificationWithIcon(
        "Employee deleted",
        `Employee with ID: ${employID} was deleted`
      );
      callback();
    })
    .catch((err) => {
      console.log(err);

      errorNotificationWithIcon("Oops!", err);
    });
};

const columns = (fetchEmployees) => [
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
  {
    title: "Actions",
    key: "actions",
    render: (employee) => (
      <Popconfirm
        title="Delete the Employee"
        description="Are you sure to delete this employee record?"
        onConfirm={() => removeEmployee(employee.id, fetchEmployees)}
        okText="Yes"
        cancelText="No"
      >
        <Button danger>Delete</Button>
      </Popconfirm>
      //   <Popconfirm
      //     placement="topRight"
      //     title={`Are you sure to delete ${employee.name}?`}
      //     // onConfirm = {() => removeStudent(employee.id, fetchStudents)}
      //     okText="Yes"
      //     cancelText="No"
      //   >
      //     {/* <Radio.Button value="small">Delete</Radio.Button> */}
      //   </Popconfirm>
      //   <Radio.Button value="small">Delete</Radio.Button>
      // </Radio.Group>
    ),
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const modifyData = (data) => {
  // add keys to raw data to list in table
  data.forEach((employee) => (employee.key = employee.id));
  // console.log("data after key: ", data);
  return data;
};

const filterData = (data, filterWord) => {
  // filter the data using the filter word, if the filter word is blank, skip it
  if (filterWord) {
    //create regular expression pattern to match the filterWord, case insensitive
    var re = new RegExp(".*" + filterWord + ".*", "i");
    data = data.filter((employee) =>
      Object.values(employee).some((value) => re.test(String(value)))
    );
  }

  // console.log("data after filter: ", data);
  return data;
};

const EmployeeTable = ({ searchText }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [employeesData, setEmployeesData] = useState([]);

  const fetchEmployees = () =>
    getAllEmployees()
      .then((data) => {
        // console.log(data);
        const modifiedData = modifyData(data); // Modify the data
        // console.log("modified data: ", modifiedData);
        setEmployeesData(modifiedData); // Set the modified data in the state
      })
      .catch((err) => {
        console.log(err.response);
        err.response.json().then((res) => {
          console.log(res);
          errorNotificationWithIcon(
            "Something happened",
            `${res.message} [statusCode: ${res.status}]`
          );
        });
      });

  useEffect(() => {
    console.log("component is mounted");
    fetchEmployees();
  }, []);

  return (
    <>
      <InsertRowForm
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        fetchEmployees={fetchEmployees}
      />
      <Table
        columns={columns(fetchEmployees)}
        dataSource={filterData(employeesData, searchText)}
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
              // count={employeesData.length}
              style={{ backgroundColor: "#52c41a" }}
              showZero={true}
            />
            <br></br>
            <br></br>
            <Tag>Number of FILTERED employees</Tag>
            <Badge
              className="site-badge-count"
              // count={modifiedData.length}
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
