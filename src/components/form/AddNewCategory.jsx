import { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../../components/common/custom-input/CustomInput";
import { useDispatch } from "react-redux";
import { postCategoryAction } from "../../features/user/category/categoryAction";

export const AddNewCategory = () => {
  const titleRef = useRef("");
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const title = titleRef.current.value;

    if (!title) {
      return alert("Must fill all the form first");
    }
    dispatch(postCategoryAction({ title }));
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
    <Form className="shadow-lg p-4 pt-0" onSubmit={handleOnSubmit}>
      {inputs.map((item) => (
        <CustomInput key={item.name} {...item} />
      ))}
      <Button className="w-100 mt-2" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
