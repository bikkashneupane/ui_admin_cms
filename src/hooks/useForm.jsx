import { useState } from "react";

const handleOnChange = ({ e, form, setForm }) => {
  let { name, value, checked, type } = e.target;
  if (name === "status") {
    value = checked ? "active" : "inactive";
  }

  if (type === "date") {
    // Format date to 'yyyy-MM-dd'
    const date = new Date(value);
    value = date.toISOString().split("T")[0];
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
