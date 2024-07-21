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
        <form className="shadow-lg p-4 rounded " onSubmit={handleOnSubmit}>
          <h3 className="text-center text-lg mb-4 font-semibold">
            Admin Registeration
          </h3>
          {inputs.map((item) => (
            <CustomInput key={item.name} {...item} onChange={handleOnChange} />
          ))}
          <button
            className="w-100 mt-2 text-white bg-teal-600 py-2 rounded-md shadow-lg"
            type="submit"
          >
            Register New Admin
          </button>
        </form>
      </div>
    </div>
  );
};
