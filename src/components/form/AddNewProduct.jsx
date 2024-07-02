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
    console.log(form);

    postProduct(form);
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
      required: true,
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
      placeholder: "11",
      required: true,
    },
    {
      label: "Category",
      name: "category",
      type: "text",
      placeholder: "Phone",
      required: true,
      options: category?.map((item) => ({
        value: item?.slug,
        name: item?.slug,
        text: item?.title?.toUpperCase(),
      })),
    },
    {
      label: "Sales Price",
      name: "salesPrice",
      type: "number",
      placeholder: "1111",
    },
    {
      label: "Sales Start",
      name: "salesStart",
      type: "date",
      placeholder: "1111",
    },
    {
      label: "Sales End",
      name: "salesEnd",
      type: "date",
      placeholder: "1111",
    },
    {
      label: "Description",
      name: "description",
      as: "textarea",
      rows: 5,
      placeholder: "Detailes Description",
      required: true,
    },
    {
      label: "Images",
      name: "images",
      type: "url",
      placeholder: "Images",
      required: true,
    },
  ];

  return (
    <Form className="shadow-lg p-4 pt-0" onSubmit={handleOnSubmit}>
      {inputs.map((item) =>
        // <CustomInput key={item.name} {...item} onChange={handleOnChange} />
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
