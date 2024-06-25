import React from "react";
import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../../components/common/custom-input/CustomInput";
import { useForm } from "../../hooks/useForm";
import { createUserAction } from "../../features/user/userAction";
import { toast } from "react-toastify";

const initialState = {
  firstName: "",
  lastName: "",
  phone: null,
  email: "",
  password: "",
  confirmPassword: "",
};

export const Register = () => {
  const { form, handleOnChange } = useForm(initialState);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { confirmPassword, ...rest } = form;
    if (confirmPassword !== rest.password) {
      return toast.error("Password Not Matched");
    }

    createUserAction(rest);
  };

  const inputs = [
    {
      label: "First Name",
      name: "firstName",
      type: "text",
      placeholder: "Jon",
      required: true,
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text",
      placeholder: "Doe",
      required: true,
    },
    {
      label: "Phone",
      name: "phone",
      type: "number",
      placeholder: "555-5555-555",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "user@email.com",
      required: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "********",
      required: true,
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      placeholder: "********",
      required: true,
    },
  ];

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 ">
      <div className="" style={{ width: "450px" }}>
        <Form className="shadow-lg p-4 rounded " onSubmit={handleOnSubmit}>
          <h3 className="text-center">Admin Registeration</h3>
          {inputs.map((item) => (
            <CustomInput key={item.name} {...item} onChange={handleOnChange} />
          ))}
          <Button className="w-100 mt-2" variant="primary" type="submit">
            Register New Admin
          </Button>
        </Form>
      </div>
    </div>
  );
};
