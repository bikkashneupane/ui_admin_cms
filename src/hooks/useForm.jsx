import { useState } from "react";

const handleOnChange = ({ e, form, setForm }) => {
  let { name, value, checked } = e.target;
  let newValue = value;

  if (name === "gender") {
    const currentValues = Array.isArray(form[name]) ? form[name] : [];

    if (checked) {
      // check if the value already exist in form
      // if exist remove
      // if not add to form
      // make it array

      newValue = !currentValues.includes(value)
        ? [...currentValues, value]
        : currentValues;
    } else {
      newValue = currentValues.filter((item) => item !== value);
    }
  }

  if (name === "status") {
    newValue = checked ? "active" : "inactive";
  }

  if (name === "material") {
    // make material an array
    newValue = [value];
  }

  setForm({ ...form, [name]: newValue });
};

export const useForm = (initialState) => {
  const [form, setForm] = useState(initialState);

  return {
    form,
    setForm,
    handleOnChange: (e) => handleOnChange({ e, form, setForm }),
  };
};
