import { useRef } from "react";
import {
  CustomCheck,
  CustomInput,
  CustomSelect,
  DynamicInputField,
} from "../common/custom-input/CustomInput";
import { useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import CustomDynamicInputField from "../common/custom-input/CustomDynamicInputField";

export const AddNewSubCategory = ({ postCategory }) => {
  const { form, handleOnChange } = useForm({});

  const { category } = useSelector((state) => state.categoryInfo);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!form.gender || !form.gender.length) {
      return console.log("All field must be provided");
    }
    console.log(form);
    // postCategory({ title });
  };

  const inputs = [
    {
      label: "Parent Category",
      name: "parentCategoryId",
      type: "select",
      required: true,
      options: category
        ?.filter((item) => item.status === "active")
        ?.map((item) => ({
          value: item?._id,
          name: item?.slug,
          text: item?.title?.toUpperCase(),
        })),
    },
    {
      label: "Gender",
      name: "gender",
      type: "checkbox",
      required: true,
      options: [
        { value: "male", text: "Male" },
        { value: "female", text: "Female" },
        { value: "unisex", text: "Unisex" },
      ],
    },
  ];

  const dynamicInput = [
    {
      label: "Brand",
      name: "brand",
      type: "text",
      placeholder: "Casio",
      required: true,
    },
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
      {dynamicInput.map((item) => {
        return (
          <DynamicInputField
            key={item.name}
            {...item}
            value={form[item.name] || []}
            onChange={handleOnChange}
          />
        );
      })}

      {/* {inputs.map((item) =>
        item.type === "checkbox" ? (
          <CustomCheck key={item.name} {...item} onChange={handleOnChange} />
        ) : (
          <CustomSelect key={item.name} {...item} onChange={handleOnChange} />
        )
      )} */}
      {/* {dynamicInput.map((item) => {
        return (
          <CustomDynamicInputField
            key={item.name}
            {...item}
            onChange={handleOnChange}
          />
        );
      })} */}
      <button
        className="w-100 mt-2 bg-teal-600 text-gray-100 py-2 rounded-lg"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};
