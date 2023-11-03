import { Button, Checkbox, Form, Input, Flex } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../states/auth";
import { userLogin } from "../../types";

// const onFinish = (values: string) => {
//   console.log("Success:", values);
// };

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const submit = async (values: userLogin) =>{
    login(values, navigate)
  }
  return (
    <Flex align="center" justify="center" style={{ height: "90vh" }}>
      <Form
        wrapperCol={{ span: 24 }}
        style={{ width: 400 }}
        initialValues={{ remember: true }}
        onFinish={submit}
        autoComplete="off"
        layout="vertical"
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Log in</h1>
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

        <Form.Item<FieldType> name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Login
          </Button>
        </Form.Item>
        <p>
          No have an account? <Link to="/register">Create new one</Link>
        </p>
      </Form>
    </Flex>
  );
};

export default LoginPage;
