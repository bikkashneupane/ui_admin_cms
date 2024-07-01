import { useState } from "react";

export const useModal = (initialState) => {
  const [show, setShow] = useState(initialState);
  return {
    show,
    showModal: () => setShow(true),
    hideModal: () => setShow(false),
  };
};
