import { Button, Form } from "react-bootstrap";
import {
  CustomInput,
  CustomSelect,
} from "../../components/common/custom-input/CustomInput";
import { useForm } from "../../hooks/useForm";

export const EditCategory = ({ selectedCategory }) => {
  const { form, handleOnChange } = useForm(selectedCategory);

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  const inputs = [
    {
      label: "Status",
      name: "status",
      type: "text",
      required: true,
      options: [
        {
          value: "active",
          text: "Active",
          selected: form.status === "active",
        },
        {
          value: "inactive",
          text: "Inactive",
          selected: form.status === "inactive",
        },
      ],
    },

    {
      label: "Title",
      name: "title",
      type: "text",
      placeholder: "Phones",
      required: true,
      value: form.title,
    },
    {
      label: "Slug",
      name: "slug",
      type: "text",
      placeholder: "phones",
      disabled: true,
      value: form.slug,
    },
  ];

  return (
    <Form className=" ">
      {inputs.map((item) =>
        item.options ? (
          <CustomSelect key={item.name} {...item} onChange={handleOnChange} />
        ) : (
          <CustomInput onChange={handleOnChange} key={item.name} {...item} />
        )
      )}

      <div className="d-grid mt-3">
        <Button onClick={handleOnSubmit}>Edit Category</Button>
      </div>
    </Form>
  );
};
