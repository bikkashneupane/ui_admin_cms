import { useRef } from "react";
import { CustomInput } from "../../components/common/custom-input/CustomInput";

export const AddNewCategory = ({ postCategory }) => {
  const titleRef = useRef("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const title = titleRef.current.value;

    if (!title) {
      return alert("Must fill all the form first");
    }

    postCategory({ title });
  };

  const inputs = [
    {
      label: "Title",
      name: "title",
      type: "text",
      placeholder: "Phones",
      required: true,
      inputRef: titleRef,
    },
  ];

  return (
    <form className="shadow-md px-4 pb-8 rounded-lg" onSubmit={handleOnSubmit}>
      {inputs.map((item) => (
        <CustomInput key={item.name} {...item} />
      ))}

      <button
        className="w-100 mt-4 bg-teal-600 text-white py-2 rounded-lg"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};
