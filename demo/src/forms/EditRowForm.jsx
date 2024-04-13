import { Button, Col, Drawer, Form, Input, Row, Spin } from "antd";
import { updateEmployee } from "../client.jsx";
import { LoadingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  successNotificationWithIcon,
  errorNotificationWithIcon,
} from "./Notification";

const spinner = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const EditRowForm = ({
  showDrawer,
  setShowDrawer,
  fetchEmployees,
  employee,
}) => {
  const [submitting, setSubmitting] = useState(false);
  console.log(employee);

  const onClose = () => {
    setShowDrawer(false);
  };
  const onFinish = (values) => {
    setSubmitting(true);
    values.id = employee.id;
    console.log(JSON.stringify(values, null, 2));
    updateEmployee(values)
      .then(() => {
        console.log("Employee updated");
        onClose();
        successNotificationWithIcon(
          "Employee updated",
          `the employee with id: ${employee.id} updated.`
        );
        fetchEmployees();
      })
      .catch((err) => {
        console.log(err);

        errorNotificationWithIcon("Oops!", err);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  const onFinishFailed = (errorInfo) => {
    alert(JSON.stringify(errorInfo, null, 2));
  };
  return (
    <>
      <Drawer
        title="Employee information update"
        width={720}
        onClose={onClose}
        open={showDrawer}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
          </div>
        }
      >
        <Form
          layout="vertical"
          onFinishFailed={onFinishFailed}
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                initialValue={employee.name}
                rules={[
                  {
                    required: true,
                    message: "Please enter employee name",
                  },
                ]}
              >
                <Input placeholder="Please enter employee name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="department"
                label="Department"
                initialValue={employee.department}
                rules={[
                  {
                    required: true,
                    message: "Please enter department",
                  },
                ]}
              >
                <Input placeholder="Please enter department" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="position"
                label="Position"
                initialValue={employee.position}
                rules={[
                  {
                    required: true,
                    message: "Please enter position",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                  placeholder="Please enter position"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="age"
                label="Age"
                initialValue={employee.age}
                rules={[
                  {
                    required: true,
                    message: "Please enter a VALID age",
                    pattern: new RegExp(/^\d{2}$/),
                  },
                ]}
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                  placeholder="Please enter age"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="salary"
                label="Salary"
                initialValue={employee.salary}
                rules={[
                  {
                    required: true,
                    message:
                      "Please enter VALID Salary ($$$ or $$$,$$$ or $$$.$$)",
                    pattern: new RegExp(/^\d+(,\d{3})*(\.\d{1,2})?$/),
                  },
                ]}
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                  placeholder="Please enter Salary"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="experience"
                label="Experience"
                initialValue={employee.experience}
                rules={[
                  {
                    required: true,
                    message: "Please enter VALID experience (y or yy or yy.y)",
                    pattern: new RegExp(/^\d{1,2}(\.\d)?$/),
                  },
                ]}
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                  placeholder="Please enter Experience"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <Row>{submitting && <Spin indicator={spinner} />}</Row>
        </Form>
      </Drawer>
    </>
  );
};
export default EditRowForm;