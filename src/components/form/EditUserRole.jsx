import { CustomSelect } from "../common/CustomInput";
import { useForm } from "../../hooks/useForm";

export const EditUserRole = ({ selectedUser, handleUserRoleChange }) => {
  const { form, handleOnChange } = useForm(selectedUser);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleUserRoleChange(form);
  };

  const inputs = [
    {
      label: "Role",
      name: "role",
      type: "text",
      required: true,
      options: [
        { text: "User", value: "user" },
        { text: "Admin", value: "admin" },
      ],
    },
  ];

  return (
    <form className="space-y-4" onSubmit={handleOnSubmit}>
      {inputs.map((item) => {
        return (
          <CustomSelect
            key={item?.name}
            defaultValue={form[item?.name]}
            onChange={handleOnChange}
            {...item}
            form={form}
          />
        );
      })}

      <div className="mt-4">
        <button
          type="submit"
          className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-700 transition"
        >
          Edit Role
        </button>
      </div>
    </form>
  );
};
