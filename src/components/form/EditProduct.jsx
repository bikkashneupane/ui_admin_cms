import { Button, Form } from "react-bootstrap";
import { CustomInput, CustomSelect } from "../common/custom-input/CustomInput";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCategoryAction } from "../../features/category/categoryAction";
import { dateFormatter } from "../../helpers/dateFormatter";

export const EditProduct = ({ selectedProduct, handleOnEditProduct }) => {
  const dispatch = useDispatch();
  const { form, images, handleOnChange, handleOnImgChange } =
    useForm(selectedProduct);
  const { category } = useSelector((state) => state.categoryInfo);

  const [existingImages, setExistingImages] = useState(
    selectedProduct?.images || []
  );

  useEffect(() => {
    dispatch(getCategoryAction());
  }, [dispatch]);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // Create FormData object
    const formData = new FormData();

    // append exsting images/ deleted from ui

    // Append form data fields
    for (let key in form) {
      formData.append(key, form[key] === null ? "" : form[key]);
    }

    // append existing images
    [...existingImages]?.forEach((image) => {
      formData.append("existingImages[]", image);
    });

    // Append new images
    if (images?.length > 0) {
      [...images]?.forEach((item) => {
        formData.append("images", item);
      });
    }

    handleOnEditProduct(formData);
  };

  const handleRemoveImage = (imageToRemove) => {
    setExistingImages(existingImages.filter((img) => img !== imageToRemove));
  };

  const inputs = [
    {
      label: "Title",
      name: "title",
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
      label: "Category",
      name: "parentCategoryId",
      type: "text",
      required: true,
      options: category.map((item) => ({
        value: item._id,
        text: item.title.toUpperCase(),
      })),
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
  ];

  return (
    <Form onSubmit={handleOnSubmit}>
      <Form.Group>
        <Form.Check
          name="status"
          type="switch"
          id="custom-switch"
          checked={form.status === "active"}
          label={form.status.toUpperCase()}
          onChange={handleOnChange}
          className={
            form.status === "active" ? "text-success mb-3" : "text-danger mb-3"
          }
        />
      </Form.Group>

      {inputs.map((item) =>
        item.options ? (
          <CustomSelect
            key={item.name}
            onChange={handleOnChange}
            {...item}
            defaultValue={selectedProduct.parentCategoryId}
          />
        ) : item.type === "date" ? (
          <CustomInput
            onChange={handleOnChange}
            key={item.name}
            {...item}
            defaultValue={dateFormatter(form[item.name]) || ""}
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

      <Form.Group>
        <Form.Control
          name="images"
          type="file"
          label="Upload Images"
          multiple
          accept="image/png, image/jpeg, image/gif"
          onChange={handleOnImgChange}
        />
      </Form.Group>

      <div>
        {existingImages.map((item) => (
          <div key={item} style={{ display: "inline-block", margin: "10px" }}>
            <img
              src={`http://localhost:8000/${item}`}
              alt="Product"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleRemoveImage(item)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      <div className="d-grid mt-3">
        <Button type="submit">Edit Product</Button>
      </div>
    </Form>
  );
};
