import { useRef } from "react";
import { useForm } from "../../hooks/useForm";
import { CustomInput, DynamicInputField } from "../common/CustomInput";

const EditBrand = ({ selectedBrand, handleOnEditBrand }) => {
  const brandRef = useRef();

  const handleOnEdit = (e) => {
    e.preventDefault();
    const brandName = brandRef.current.value;
    handleOnEditBrand({ _id: selectedBrand?._id, name: brandName });
  };

  const inputs = [
    {
      label: "Brand",
      name: "brand",
      type: "text",
      placeholder: "Casio",
      required: true,
      inputRef: brandRef,
      defaultValue: selectedBrand?.name,
    },
    {
      label: "Slug",
      name: "slug",
      type: "text",
      placeholder: "phones",
      disabled: true,
      value: selectedBrand?.slug,
    },
  ];

  return (
    <form className="shadow-md px-4 py-8 rounded-lg" onSubmit={handleOnEdit}>
      {inputs.map((item) => (
        <CustomInput key={item.name} {...item} />
      ))}

      <button
        className="w-100 mt-4 bg-teal-600 text-white py-2 rounded-lg"
        type="submit"
      >
        Edit Brand
      </button>
    </form>
  );
};

export default EditBrand;
