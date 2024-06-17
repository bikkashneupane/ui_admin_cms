import { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../../components/common/custom-input/CustomInput";
import { loginAdminAction } from "../../features/user/userAction";

export const Login = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    loginAdminAction({ email, password });
  };

  const inputs = [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "user@email.com",
      required: true,
      inputRef: emailRef,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "********",
      required: true,
      inputRef: passwordRef,
    },
  ];

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 ">
      <div className="" style={{ width: "450px" }}>
        <Form
          className="shadow-lg p-4 rounded m-auto"
          onSubmit={handleOnSubmit}
        >
          <h3>Admin Login</h3>
          {inputs.map((item) => (
            <CustomInput key={item.name} {...item} />
          ))}
          <Button className="w-100 mt-2" variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};
