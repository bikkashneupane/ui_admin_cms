import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getCategoryAction } from "../../features/category/categoryAction";
import { editProductAction } from "../../features/product/productAction";
import { useForm } from "../../hooks/useForm";
import { dateFormatter } from "../../helpers/dateFormatter";
import { CustomInput, CustomSelect } from "../../components/common/CustomInput";

export const EditProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { category, brands, materials } = useSelector(
    (state) => state.categoryInfo
  );
  const { selectedProduct } = useSelector((state) => state.productInfo);

  const [existingImages, setExistingImages] = useState(
    selectedProduct?.images || []
  );
  const [newImages, setNewImages] = useState([]);
  const [fileCount, setFileCount] = useState(0); // State to track the number of files
  const { form, handleOnChange } = useForm(selectedProduct || {});

  useEffect(() => {
    dispatch(getCategoryAction());
  }, [dispatch]);

  const handleOnEditProduct = (obj) => {
    dispatch(editProductAction(obj, navigate));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    // Append form data fields
    for (let key in form) {
      if (key !== "images") {
        formData.append(key, form[key] === null ? "" : form[key]);
      }
    }

    // Append existing images
    existingImages.forEach((image) => {
      formData.append("images[]", image);
    });

    // Append new images
    newImages.forEach((item) => {
      formData.append("new-images", item);
    });

    handleOnEditProduct(formData);
  };

  const handleRemoveExistingImage = (imageToRemove) => {
    setExistingImages(existingImages.filter((img) => img !== imageToRemove));
    setFileCount((prevCount) => prevCount - 1); // Update the file count
  };

  const handleRemoveNewImage = (index) => {
    const updatedNewImages = [...newImages];
    updatedNewImages.splice(index, 1);
    setNewImages(updatedNewImages);
    setFileCount((prevCount) => prevCount - 1); // Update the file count
  };

  const handleNewImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages([...newImages, ...files]);
    setFileCount((prevCount) => prevCount + files.length); // Update the file count
  };

  const inputs = [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Phone",
      required: true,
    },
    {
      label: "SKU",
      name: "sku",
      type: "text",
      placeholder: "111",
      disabled: true,
    },
    {
      label: "Slug",
      name: "slug",
      type: "text",
      placeholder: "111",
      disabled: true,
    },
    {
      label: "Price",
      name: "price",
      type: "number",
      placeholder: "1234",
      required: true,
    },
    {
      label: "Quantity",
      name: "quantity",
      type: "number",
      required: true,
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
      label: "Sales Price",
      name: "salesPrice",
      type: "number",
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
      label: "Category",
      name: "categoryId",
      type: "text",
      required: true,
      options: category.map((item) => ({
        value: item._id,
        text: item.title.toUpperCase(),
      })),
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
      <h1 className="text-center text-2xl font-bold mt-10 mb-4">
        Edit Product
      </h1>
      <form
        onSubmit={handleOnSubmit}
        className="space-y-4 rounded-md shadow-lg p-10 bg-gray-700"
      >
        <div className="text-end">
          <Link
            to={"/admin/products"}
            className="bg-gray-900 px-3 py-2 rounded-md"
          >
            X
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <label className="flex items-center space-x-2">
            <input
              name="status"
              type="checkbox"
              checked={form.status === "active"}
              onChange={handleOnChange}
              className="form-switch"
            />
            <span
              className={
                form.status === "active"
                  ? "text-green-600 font-bold"
                  : "text-red-600 font-bold"
              }
            >
              {form.status.toUpperCase()}
            </span>
          </label>
        </div>

        {inputs.map((item) =>
          item.options ? (
            <CustomSelect
              key={item.name}
              onChange={handleOnChange}
              {...item}
              defaultValue={selectedProduct[item.name]}
            />
          ) : item.type === "date" ? (
            <CustomInput
              onChange={handleOnChange}
              key={item.name}
              {...item}
              defaultValue={form[item.name] || ""}
            />
          ) : (
            <CustomInput
              onChange={handleOnChange}
              key={item.name}
              {...item}
              value={form[item.name] || ""}
            />
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
              form={form}
              defaultValue={selectedProduct.brandId}
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
              defaultValue={selectedProduct.materialId}
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
        <div>
          <label
            htmlFor="new-images"
            className="block w-full text-sm cursor-pointer bg-teal-600 text-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-teal-700 focus:outline-none"
          >
            Choose Files {fileCount.length && `${fileCount} files selected`}
          </label>
          <input
            id="new-images"
            name="new-images"
            type="file"
            multiple
            accept="image/png, image/jpeg, image/gif, image/webp"
            onChange={handleNewImagesChange}
            className="hidden"
          />
        </div>

        <div className="flex flex-wrap">
          {existingImages.map((item) => (
            <div key={item} className="relative flex flex-col gap-1 m-3">
              <img
                src={item}
                alt="Product"
                className="w-24 h-24 object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveExistingImage(item)}
                className="px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full"
              >
                Remove
              </button>
            </div>
          ))}
          {newImages.length > 0 && (
            <div className="bg-purple-500 min-h-10px min-w-1"></div>
          )}
          {newImages.map((item, index) => (
            <div key={index} className="relative flex flex-col gap-1 m-3">
              <img
                src={URL.createObjectURL(item)}
                alt="New Product"
                className="w-24 h-24 object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveNewImage(index)}
                className="px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-teal-600 rounded hover:bg-teal-700 focus:outline-none"
          >
            Edit Product
          </button>
        </div>
      </form>
    </div>
  );
};
