import { useState } from "react";

const handleOnChange = ({ e, form, setForm }) => {
  let { name, value, checked } = e.target;
  let newValue = value;

  // if (name === "gender") {
  //   const currentValues = form[name] || [];
  //   newValue = checked
  //     ? [...currentValues, value]
  //     : currentValues.filter((v) => v !== value);
  // }

  if (name === "status") {
    newValue = checked ? "active" : "inactive";
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
