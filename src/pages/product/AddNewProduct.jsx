import { useNavigate } from "react-router-dom";
import { CustomInput, CustomSelect } from "../../components/common/CustomInput";
import { postProductAction } from "../../features/product/productAction";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";

export const AddNewProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { form, handleOnChange } = useForm({});
  const [images, setImages] = useState([]);

  const { category, brands, materials } = useSelector(
    (state) => state.categoryInfo
  );

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // Check if images are selected
    if (images.length === 0) {
      alert("Please select at least one image.");
      return;
    }

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

  // logic to make date picker appear when clicke anywhere on the input field
  const salesStartRef = useRef();
  const salesEndRef = useRef();

  const handleDatePicker = (e, currentRef) => {
    e.preventDefault();
    currentRef.current.showPicker();
  };

  const inputs = [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Apple Watch",
      required: true,
    },
    {
      label: "SKU",
      name: "sku",
      type: "text",
      placeholder: "AW12",
      required: true,
    },
    {
      label: "Price",
      name: "price",
      type: "number",
      placeholder: "499",
      required: true,
    },
    {
      label: "Quantity",
      name: "quantity",
      type: "number",
      placeholder: "18",
      required: true,
    },
    {
      label: "Sales Price",
      name: "salesPrice",
      type: "number",
      placeholder: "349",
      min: 1,
    },
    {
      label: "Sales Start Date",
      name: "salesStart",
      type: "date",
      inputRef: salesStartRef,
    },
    {
      label: "Sales End Date",
      name: "salesEnd",
      type: "date",
      inputRef: salesEndRef,
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
          text: "MEN",
        },
        {
          value: "women",
          name: "women",
          text: "WOMEN",
        },
        {
          value: "unisex",
          name: "unisex",
          text: "UNISEX",
        },
      ],
    },
    {
      label: "Description",
      name: "description",
      placeholder: "Product Detail, Specifications",
      as: "textarea",
      rows: 8,
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
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
      <h1 className="text-center text-2xl font-bold mt-10 mb-4">Add Product</h1>
      <form
        onSubmit={handleOnSubmit}
        className="space-y-4 rounded-md shadow-lg p-10 bg-white"
      >
        {inputs.map((item) =>
          item?.options ? (
            <CustomSelect
              key={item?.name}
              onChange={handleOnChange}
              {...item}
            />
          ) : item?.type === "date" ? (
            <div
              key={item?.name}
              onClick={(e) => handleDatePicker(e, item.inputRef)}
            >
              <CustomInput onChange={handleOnChange} {...item} />
            </div>
          ) : (
            <CustomInput key={item?.name} onChange={handleOnChange} {...item} />
          )
        )}

        {/* subCat part */}
        {form?.categoryId && (
          <>
            {/* brand */}
            <CustomSelect
              label="Brand"
              name="brandId"
              onChange={handleOnChange}
              options={brands
                ?.filter((item) => {
                  const selectedCategory = category?.find(
                    (cat) => cat._id === form?.categoryId
                  );
                  return selectedCategory?.brand?.includes(item._id);
                })
                ?.map((itm) => ({
                  value: itm?._id,
                  text: itm?.slug.toUpperCase(),
                  name: itm?.name,
                }))}
            />

            {/* material */}
            <CustomSelect
              label="Material"
              name="materialId"
              onChange={handleOnChange}
              options={materials
                ?.filter((item) => {
                  const selectedCategory = category?.find(
                    (cat) => cat._id === form?.categoryId
                  );
                  return selectedCategory?.material?.includes(item._id);
                })
                ?.map((itm) => ({
                  value: itm?._id,
                  text: itm?.slug.toUpperCase(),
                  name: itm?.name,
                }))}
            />
          </>
        )}

        {/* Upload Images  */}
        <div className="space-y-4">
          <label
            htmlFor="images"
            className="block w-full text-sm cursor-pointer bg-teal-600 text-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-teal-700 focus:outline-none"
          >
            Choose Files ({images.length} files selected)
          </label>
          <input
            id="images"
            name="images"
            type="file"
            multiple
            accept="image/png,image/jpeg, image/gif, image/webp"
            onChange={handleNewImagesChange}
            className="hidden"
          />
        </div>

        {/* Display Uploaded Images */}
        <div className="flex flex-wrap mt-4">
          {images?.map((item, index) => (
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
