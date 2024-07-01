import { Button, Form } from "react-bootstrap";
import {
  CustomInput,
  CustomSelect,
} from "../../components/common/custom-input/CustomInput";
import { useForm } from "../../hooks/useForm";

export const EditCategory = ({ selectedCategory, handleOnEditCategory }) => {
  const { form, handleOnChange } = useForm(selectedCategory);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleOnEditCategory(form);
  };

  const inputs = [
    // {
    //   label: "Status",
    //   name: "status",
    //   type: "text",
    //   required: true,
    //   options: [
    //     {
    //       value: "active",
    //       text: "Active",
    //       selected: form.status === "active",
    //     },
    //     {
    //       value: "inactive",
    //       text: "Inactive",
    //       selected: form.status === "inactive",
    //     },
    //   ],
    // },

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

      {inputs.map(
        (item) => (
          <CustomInput onChange={handleOnChange} key={item.name} {...item} />
        )
        // item.options ? (
        //   <CustomSelect key={item.name} onChange={handleOnChange} {...item} />
        // ) : (
        //   <CustomInput onChange={handleOnChange} key={item.name} {...item} />
        // )
      )}

      <div className="d-grid mt-3">
        <Button type="submit">Edit Category</Button>
      </div>
    </Form>
  );
};
