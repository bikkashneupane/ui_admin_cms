import { DynamicInputField } from "../common/CustomInput";
import { useForm } from "../../hooks/useForm";
import { toast } from "react-toastify";

export const AddNewBrand = ({ postCategory }) => {
  const { form, setForm, handleOnChange } = useForm({ brand: [""] });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!form.brand.length) {
      return toast.error("All field must be provided");
    }
    postCategory(form, "addBrand", true);
  };

  const inputs = [
    {
      label: "Brand",
      name: "brand",
      type: "text",
      placeholder: "Casio",
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
        Add Brand
      </button>
    </form>
  );
};
