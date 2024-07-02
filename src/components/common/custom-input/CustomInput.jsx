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

export const CustomSelect = ({ label, options, defaultValue, ...rest }) => {
  console.log(options?.map((item) => item.value));
  return (
    <>
      <Form.Group className="mb-3">
        {label && <Form.Label>{label}</Form.Label>}

        <Form.Select {...rest} defaultValue={defaultValue}>
          {options?.map((item) => (
            <option key={item?.value} value={item?.value}>
              {item?.text}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    </>
  );
};
