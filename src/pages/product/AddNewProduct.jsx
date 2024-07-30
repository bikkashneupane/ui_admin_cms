import { useNavigate } from "react-router-dom";
import {
  CustomInput,
  CustomSelect,
} from "../../components/common/custom-input/CustomInput";
import { postProductAction } from "../../features/product/productAction";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export const AddNewProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { form, handleOnChange } = useForm({});
  const { category } = useSelector((state) => state.categoryInfo);

  const [images, setImages] = useState([]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // Populate the form data
    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }

    if (images?.length > 0) {
      [...images]?.forEach((item) => {
        formData.append("images", item);
      });
    }

    dispatch(postProductAction(formData, navigate));
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleNewImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  const inputs = [
    {
      label: "Name",
      name: "name",
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
      name: "categoryId",
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
      label: "Gender",
      name: "gender",
      type: "text",
      required: true,
      options: [
        {
          value: "men",
          name: "men",
          text: "Men",
        },
        {
          value: "women",
          name: "women",
          text: "Women",
        },
        {
          value: "unisex",
          name: "unisex",
          text: "Unisex",
        },
      ],
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
      multiple: true,
      accept: ["image/png", "image/jpeg", "image/gif", "image/webp"],
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
      <h1 className="text-center text-2xl font-bold mt-10 mb-4">Add Product</h1>
      <form
        onSubmit={handleOnSubmit}
        className="space-y-4 rounded-md shadow-lg p-10 bg-white"
      >
        {inputs.map((item) =>
          item.options ? (
            <CustomSelect
              key={item?.name}
              onChange={handleOnChange}
              {...item}
            />
          ) : item.type === "file" ? (
            <div key={item?.name} className="space-y-4">
              <label
                htmlFor={item.name}
                className="block w-full text-sm cursor-pointer bg-teal-600 text-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-teal-700 focus:outline-none"
              >
                Choose Files ({images.length} files selected)
              </label>
              <input
                id={item.name}
                name={item.name}
                type={item.type}
                multiple
                accept={item.accept}
                onChange={handleNewImagesChange}
                className="hidden"
              />
            </div>
          ) : (
            <CustomInput onChange={handleOnChange} key={item?.name} {...item} />
          )
        )}
        <div className="flex flex-wrap mt-4">
          {images.map((item, index) => (
            <div key={index} className="relative flex flex-col gap-1 m-3">
              <img
                src={URL.createObjectURL(item)}
                alt="Product"
                className="w-24 h-24 object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          className="w-full mt-2 bg-teal-600 text-white font-semibold py-2 rounded-md shadow-md hover:bg-teal-700 focus:outline-none"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
