import { Button, Form } from "react-bootstrap";
import { CustomInput, CustomSelect } from "../common/custom-input/CustomInput";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategoryAction } from "../../features/category/categoryAction";

export const EditProduct = ({ selectedProduct, handleOnEditProduct }) => {
  const dispatch = useDispatch();
  const { form, handleOnChange } = useForm(selectedProduct);
  const { category } = useSelector((state) => state.categoryInfo);

  useEffect(() => {
    dispatch(getCategoryAction());
  }, [dispatch]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleOnEditProduct(form);
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
      options: category?.map((item) => ({
        value: item?._id,
        text: item?.title?.toUpperCase(),
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
    {
      label: "Thumbnil",
      name: "thumbnail",
      type: "url",
      required: true,
    },
    {
      label: "Images",
      name: "images",
      type: "url",
      required: true,
    },
  ];

  return (
    <Form className="" onSubmit={handleOnSubmit}>
      <Form.Group>
        <Form.Check
          name="status"
          type="switch"
          id="custom-switch"
          checked={form?.status === "active"}
          label={form?.status?.toUpperCase()}
          onChange={handleOnChange}
          className={
            form?.status === "active" ? "text-success mb-3" : "text-danger mb-3"
          }
        />
      </Form.Group>

      {inputs.map((item) =>
        item.options ? (
          <CustomSelect
            key={item.name}
            onChange={handleOnChange}
            {...item}
            defaultValue={selectedProduct?.parentCategoryId}
          />
        ) : (
          <CustomInput
            onChange={handleOnChange}
            key={item.name}
            {...item}
            value={form[item?.name] || ""}
          />
        )
      )}

      <div className="d-grid mt-3">
        <Button type="submit">Edit Product</Button>
      </div>
    </Form>
  );
};
