import { Form } from "react-bootstrap";

export const CustomInput = ({ label, inputRef, ...rest }) => {
  return (
    <>
      <Form.Group className="mb-3">
        {label && <Form.Label>{label}</Form.Label>}
        <Form.Control {...rest} ref={inputRef} />
      </Form.Group>
    </>
  );
};

export const CustomSelect = ({ label, options, selectedProduct, ...rest }) => {
  console.log(
    options?.map((item) => {
      return item;
    })
  );

  return (
    <>
      <Form.Group className="mb-3">
        {label && <Form.Label>{label}</Form.Label>}

        <Form.Select {...rest}>
          {options?.map((item) => (
            <option
              key={item?.value}
              value={item?.value}
              selected={item[item?.value]}
            >
              {item?.text}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    </>
  );
};
