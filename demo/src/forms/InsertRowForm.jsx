import { Button, Col, Drawer, Form, Input, Row, Spin } from "antd";
import { addNewEmployee } from "../client.jsx";
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
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

function InsertRowForm({ showDrawer, setShowDrawer, fetchEmployees }) {
  const [submitting, setSubmitting] = useState(false);
  const onClose = () => {
    setShowDrawer(false);
  };
  const onFinish = (values) => {
    setSubmitting(true);
    console.log(JSON.stringify(values, null, 2));
    addNewEmployee(values)
      .then(() => {
        console.log("Employee added");
        onClose();
        successNotificationWithIcon(
          "Employee added",
          `the employee with name: ${values.name} added.`
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
        title="Register for a new employee"
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
                name="id"
                label="ID"
                rules={[
                  {
                    required: true,
                    message: "Please enter VALID employee ID! (numbers only)",
                    pattern: new RegExp(/^\d+$/),
                  },
                ]}
              >
                <Input placeholder="Please enter employee ID" />
              </Form.Item>
              <Form.Item
                name="name"
                label="Name"
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
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <Row>{submitting && <Spin indicator={spinner} />}</Row>
        </Form>
      </Drawer>
    </>
  );
}
export default InsertRowForm;
