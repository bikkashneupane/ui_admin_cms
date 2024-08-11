import { DynamicInputField } from "../../components/common/custom-input/CustomInput";
import { useForm } from "../../hooks/useForm";

export const AddNewBrand = ({ postCategory }) => {
  const { form, setForm, handleOnChange } = useForm({ brand: [""] });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!form.brand.length) {
      return console.log("All field must be provided");
    }
    console.log(form);
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
