import { Table, Button, Tag, Badge, Popconfirm, Flex } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getAllEmployees, deleteEmployee } from "./client";
import { useState, useEffect } from "react";
import {
  successNotificationWithIcon,
  errorNotificationWithIcon,
} from "./forms/Notification";
import InsertRowForm from "./forms/InsertRowForm";
import EditRowForm from "./forms/EditRowForm";
import LoadingPage from "./components/LoadingPage";

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

const columns = (
  fetchEmployees,
  { setShowEditDrawer, setEditedEmployee, setFetching }
) => {
  return [
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
        <Flex gap="small" wrap="wrap">
          <Button
            type="primary"
            onClick={() => {
              console.log("onclick: ", employee);
              setEditedEmployee(employee);
              setShowEditDrawer(true);
            }}
          >
            edit
          </Button>
          <Popconfirm
            title="Delete the Employee"
            description="Are you sure to delete this employee record?"
            onConfirm={() => {
              setFetching(true);
              removeEmployee(employee.id, fetchEmployees);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Flex>
      ),
    },
  ];
};

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
  const [showInsertDrawer, setShowInsertDrawer] = useState(false);
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [employeesData, setEmployeesData] = useState([]);
  const [editedEmployee, setEditedEmployee] = useState({});

  const fetchEmployees = () => {
    setFetching(true);
    getAllEmployees()
      .then((data) => {
        // console.log(data);
        const modifiedData = modifyData(data); // Modify the data
        // console.log("modified data: ", modifiedData);
        setEmployeesData(modifiedData); // Set the modified data in the state
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      })
      .finally(() => setFetching(false));
  };

  useEffect(() => {
    console.log("component is mounted");
    fetchEmployees();
  }, []);

  return (
    <>
      <InsertRowForm
        showDrawer={showInsertDrawer}
        setShowDrawer={setShowInsertDrawer}
        fetchEmployees={fetchEmployees}
      />
      <EditRowForm
        key={editedEmployee.key} //force re-render of editform
        showDrawer={showEditDrawer}
        setShowDrawer={setShowEditDrawer}
        fetchEmployees={fetchEmployees}
        employee={editedEmployee}
      />
      {fetching ? (
        <LoadingPage
          message={"No data available yet... "}
          description={"Fetching data from server..."}
        />
      ) : (
        <Table
          columns={columns(fetchEmployees, {
            setShowEditDrawer,
            setEditedEmployee,
            setFetching,
          })}
          dataSource={filterData(employeesData, searchText)}
          title={() => (
            <>
              <Button
                onClick={() => setShowInsertDrawer(!showInsertDrawer)}
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
                count={filterData(employeesData, searchText).length}
                style={{ backgroundColor: "#52c41a" }}
                showZero={true}
              />
            </>
          )}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default EmployeeTable;
