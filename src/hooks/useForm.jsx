import { useState } from "react";

const handleOnChange = ({ e, form, setForm }) => {
  let { name, value, checked } = e.target;
  if (name === "status") {
    value = checked ? "active" : "inactive";
  }

  setForm({ ...form, [name]: value });
};

export const useForm = (initialState) => {
  const [form, setForm] = useState(initialState);
  return {
    form,
    setForm,
    handleOnChange: (e) => handleOnChange({ e, form, setForm }),
  };
};
