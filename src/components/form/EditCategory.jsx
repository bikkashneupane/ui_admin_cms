import {
  CustomInput,
  CustomSelect,
} from "../../components/common/custom-input/CustomInput";
import { useForm } from "../../hooks/useForm";

export const EditCategory = ({ selectedCategory, handleOnEditCategory }) => {
  const { form, handleOnChange } = useForm(selectedCategory);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleOnEditCategory(form);
  };

  const inputs = [
    {
      label: "Title",
      name: "title",
      type: "text",
      placeholder: "Phones",
      required: true,
      value: form.title,
    },
    {
      label: "Slug",
      name: "slug",
      type: "text",
      placeholder: "phones",
      disabled: true,
      value: form.slug,
    },
  ];

  return (
    <form className="space-y-4" onSubmit={handleOnSubmit}>
      <div className="flex items-center mb-4">
        <label
          htmlFor="status"
          className={`flex items-center cursor-pointer ${
            form?.status === "active" ? "text-green-600" : "text-red-600"
          }`}
        >
          <input
            type="checkbox"
            id="status"
            name="status"
            checked={form?.status === "active"}
            onChange={handleOnChange}
            className="sr-only"
          />
          <span
            className={`relative inline-block w-16 h-6 rounded-full ${
              form?.status === "active" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            <span
              className={`absolute left-0 top-0 inline-block w-8 h-6 transform rounded-full transition-transform ${
                form?.status === "active" ? "translate-x-8" : ""
              } bg-gray-100`}
            ></span>
          </span>
          <span className="ml-3 font-semibold">
            {form?.status?.toUpperCase()}
          </span>
        </label>
      </div>

      {inputs.map((item) => (
        <CustomInput key={item.name} onChange={handleOnChange} {...item} />
      ))}

      <div className="mt-4">
        <button
          type="submit"
          className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-700 transition"
        >
          Edit Category
        </button>
      </div>
    </form>
  );
};
