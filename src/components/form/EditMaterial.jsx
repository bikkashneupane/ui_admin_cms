import { useRef } from "react";
import { CustomInput } from "../common/custom-input/CustomInput";

const EditMaterial = ({ selectedMaterial, handleOnEditMaterial }) => {
  const materialRef = useRef();

  const handleOnEdit = (e) => {
    e.preventDefault();
    const materialName = materialRef.current.value;
    handleOnEditMaterial({ _id: selectedMaterial?._id, name: materialName });
  };

  const inputs = [
    {
      label: "Material",
      name: "material",
      type: "text",
      placeholder: "Casio",
      required: true,
      inputRef: materialRef,
      defaultValue: selectedMaterial?.name,
    },
    {
      label: "Slug",
      name: "slug",
      type: "text",
      placeholder: "phones",
      disabled: true,
      value: selectedMaterial?.slug,
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
        Edit Material
      </button>
    </form>
  );
};

export default EditMaterial;
