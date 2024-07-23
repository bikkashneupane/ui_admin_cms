import {
  CustomInput,
  CustomSelect,
} from "../../components/common/custom-input/CustomInput";
import { useForm } from "../../hooks/useForm";
import { useSelector } from "react-redux";

export const AddNewProduct = ({ postProduct }) => {
  const { form, setForm, handleOnChange, handleOnImgChange, images } = useForm(
    {}
  );
  const { category } = useSelector((state) => state.categoryInfo);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    //populate the form data
    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }

    if (images?.length > 0) {
      [...images]?.forEach((item) => {
        formData.append("images", item);
      });
    }

    postProduct(formData);
  };

  const inputs = [
    {
      label: "Title",
      name: "title",
      type: "text",
      required: true,
    },
    {
      label: "SKU",
      name: "sku",
      type: "text",
      required: true,
    },
    {
      label: "Price",
      name: "price",
      type: "number",
      required: true,
    },
    {
      label: "Quantity",
      name: "quantity",
      type: "number",
      required: true,
    },
    {
      label: "Category",
      name: "parentCategoryId",
      type: "text",
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
      label: "Sales Price",
      name: "salesPrice",
      type: "number",
      min: 1,
    },
    {
      label: "Sales Start Date",
      name: "salesStart",
      type: "date",
    },
    {
      label: "Sales End Date",
      name: "salesEnd",
      type: "date",
    },
    {
      label: "Description",
      name: "description",
      as: "textarea",
      rows: 5,
      required: true,
    },
    {
      label: "Upload Images",
      name: "images",
      type: "file",
      required: true,
      multiple: true,
      accept: ["image/png", "image/jpeg", "image/gif", "image/webp"],
    },
  ];

  return (
    <form className="shadow-md rounded-lg p-4" onSubmit={handleOnSubmit}>
      {inputs.map((item) =>
        item.options ? (
          <CustomSelect key={item?.name} onChange={handleOnChange} {...item} />
        ) : item.type === "file" ? (
          <CustomInput
            onChange={handleOnImgChange}
            key={item?.name}
            {...item}
          />
        ) : (
          <CustomInput onChange={handleOnChange} key={item?.name} {...item} />
        )
      )}
      <button
        className="w-full mt-2 bg-teal-600 text-white font-semibold py-2 rounded-md shadow-md"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};
