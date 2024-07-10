import { useState } from "react";

const handleOnChange = ({ e, form, setForm }) => {
  let { name, value, checked } = e.target;
  if (name === "status") {
    value = checked ? "active" : "inactive";
  }

  setForm({ ...form, [name]: value });
};

const handleOnImgChange = ({ e, setImages }) => {
  const { files } = e.target;
  setImages(files);
};

export const useForm = (initialState) => {
  const [form, setForm] = useState(initialState);
  const [images, setImages] = useState([]);

  return {
    form,
    images,
    setForm,
    handleOnChange: (e) => handleOnChange({ e, form, setForm }),
    handleOnImgChange: (e) => handleOnImgChange({ e, setImages }),
  };
};
