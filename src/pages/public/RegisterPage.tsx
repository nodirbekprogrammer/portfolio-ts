import { Button, Form, Input, Flex } from "antd";
import { Link } from "react-router-dom";

const onFinish = (values: string) => {
  console.log("Success:", values);
};

type FieldType = {
  firstname?: string;
  lastname?: string;
  username?: string;
  password?: string;
};

const RegisterPage = () => {
  return (
    <Flex align="center" justify="center" style={{ height: "90vh" }}>
      <Form
        wrapperCol={{ span: 24 }}
        style={{ width: 400 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Register</h1>
        <Form.Item<FieldType>
          label="Firstname"
          name="firstname"
          rules={[{ required: true, message: "Please input your firstname!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Lastname"
          name="lastname"
          rules={[{ required: true, message: "Please input your lastname!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Register
          </Button>
        </Form.Item>
        <p>
          <Link to="/login">Back to login</Link>
        </p>
      </Form>
    </Flex>
  );
};

export default RegisterPage;
