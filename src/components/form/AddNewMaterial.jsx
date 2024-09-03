import { DynamicInputField } from "../common/CustomInput";
import { useForm } from "../../hooks/useForm";
import { toast } from "react-toastify";

export const AddNewMaterial = ({ postCategory }) => {
  const { form, setForm, handleOnChange } = useForm({ material: [""] });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!form.material.length) {
      return toast.errorg("All field must be provided");
    }
    postCategory(form, "addMaterial", true);
  };

  const inputs = [
    {
      label: "Material",
      name: "material",
      type: "text",
      placeholder: "Stainless Steel",
      required: true,
    },
  ];

  return (
    <form className="shadow-md px-4 py-8 rounded-lg" onSubmit={handleOnSubmit}>
      {inputs.map((item) => (
        <DynamicInputField
          key={item.name}
          {...item}
          form={form}
          setForm={setForm}
          onChange={handleOnChange}
        />
      ))}

      <button
        className="w-100 mt-4 bg-teal-600 text-white py-2 rounded-lg"
        type="submit"
      >
        Add Material
      </button>
    </form>
  );
};
