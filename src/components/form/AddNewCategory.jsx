import {
  CustomCheck,
  CustomInput,
} from "../../components/common/custom-input/CustomInput";
import { useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";

const initialState = {
  title: "",
  brand: [],
  material: [],
};

export const AddNewCategory = ({ postCategory }) => {
  const { brands, materials } = useSelector((state) => state.categoryInfo);

  const { form, handleOnChange } = useForm(initialState);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    postCategory(form, "addCategory");
  };

  const inputs = [
    {
      label: "Title",
      name: "title",
      type: "text",
      placeholder: "Phones",
      required: true,
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
    <form
      className="shadow-md px-4 pb-8 rounded-lg space-y-4"
      onSubmit={handleOnSubmit}
    >
      {inputs.map((item) => {
        return !item?.options ? (
          <CustomInput
            key={item?.name}
            {...item}
            onChange={handleOnChange}
            form={form}
          />
        ) : item?.options?.length > 0 ? (
          <CustomCheck
            key={item.name}
            {...item}
            onChange={handleOnChange}
            form={form}
          />
        ) : null;
      })}

      <button
        className="w-100 mt-4 bg-teal-600 text-white py-2 rounded-lg"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};
