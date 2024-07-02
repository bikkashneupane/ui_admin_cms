import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../../components/common/custom-input/CustomInput";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";

export const Profile = () => {
  const { form, handleOnChange } = useForm({});

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
      disabled: true,
    },
    {
      label: "Current Password",
      name: "currentPassword",
      type: "password",
      placeholder: "********",
      required: true,
    },
    {
      label: "New Password",
      name: "newPassword",
      type: "password",
      placeholder: "********",
      required: true,
    },
  ];

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="bg-light rounded" style={{ width: "450px" }}>
        <Form className="shadow-lg p-4">
          <h3 className="text-center">Update User Profile</h3>
          {inputs.map((item) => (
            <CustomInput key={item.name} {...item} />
          ))}
          <Button className="w-100 mt-2" variant="primary" type="submit">
            Update Profile
          </Button>

          <div className="mt-3 text-end">
            Forget Password?
            <Link to={"/forget-password"}> Reset Password!</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};
