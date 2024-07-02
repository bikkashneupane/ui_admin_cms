import { Button, Form } from "react-bootstrap";
import {
  CustomInput,
  CustomSelect,
} from "../../components/common/custom-input/CustomInput";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategoryAction } from "../../features/category/categoryAction";

export const AddNewProduct = ({ postProduct }) => {
  const dispatch = useDispatch();
  const { form, setForm, handleOnChange } = useForm({});
  const { category } = useSelector((state) => state.categoryInfo);

  useEffect(() => {
    dispatch(getCategoryAction());
  }, [dispatch]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    postProduct({
      ...form,
      images: form.images.split(", "),
    });
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
      label: "Thumbnail",
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
    <Form className="shadow-lg p-4 pt-0" onSubmit={handleOnSubmit}>
      {inputs.map((item) =>
        item.options ? (
          <CustomSelect key={item?.name} onChange={handleOnChange} {...item} />
        ) : (
          <CustomInput onChange={handleOnChange} key={item?.name} {...item} />
        )
      )}
      <Button className="w-100 mt-2" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
