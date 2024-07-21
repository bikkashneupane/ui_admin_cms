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
    <div className="flex justify-center items-center my-20">
      <div className="rounded w-full max-w-lg">
        <div className="shadow-lg p-4">
          <h3 className="text-center">Update User Profile</h3>
          {inputs.map((item) => (
            <CustomInput key={item.name} {...item} />
          ))}
          <button
            className="w-100 mt-2 bg-gray-900 text-white py-3 rounded-lg "
            type="submit"
          >
            Update Profile
          </button>

          <div className="mt-3 text-end">
            Forget Password?
            <Link to={"/forget-password"}>
              {" "}
              <span className="font-medium text-teal-700">Reset Password!</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
