import { useSelector } from "react-redux";
import {
  CustomCheck,
  CustomInput,
} from "../../components/common/custom-input/CustomInput";
import { useForm } from "../../hooks/useForm";

export const EditCategory = ({ selectedCategory, handleOnEditCategory }) => {
  const { form, handleOnChange } = useForm(selectedCategory);
  const { brands, materials } = useSelector((state) => state.categoryInfo);
  console.log(form);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // console.log(form);
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
    {
      label: "Brand",
      name: "brand",
      type: "text",
      placeholder: "Casio",
      required: true,
      options: brands?.map((item) => ({
        value: item?._id,
        name: item?.slug,
        text: item?.name?.toUpperCase(),
      })),
    },
    {
      label: "Material",
      name: "material",
      type: "text",
      placeholder: "Quartz",
      required: true,
      options: materials?.map((item) => ({
        value: item?._id,
        name: item?.slug,
        text: item?.name?.toUpperCase(),
      })),
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
            className={`relative inline-block w-12 h-6 rounded-full ${
              form?.status === "active" ? "bg-green-600" : "bg-red-400"
            }`}
          >
            <span
              className={`absolute left-0 top-0 w-6 h-6 transform rounded-full transition-transform ${
                form?.status === "active" ? "translate-x-6" : ""
              } bg-gray-100 border`}
            ></span>
          </span>

          <span className="ml-3 font-semibold">
            {form?.status?.toUpperCase()}
          </span>
        </label>
      </div>

      {inputs.map((item) => {
        return item?.options ? (
          <CustomCheck
            key={item?.name}
            onChange={handleOnChange}
            {...item}
            form={form}
          />
        ) : (
          <CustomInput key={item?.name} onChange={handleOnChange} {...item} />
        );
      })}

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
