import { useState } from "react";

export const useModal = () => {
  const [modalStates, setModalStates] = useState({});

  const showModal = (modalName) => {
    setModalStates((prev) => ({ ...prev, [modalName]: true }));
  };

  const hideModal = (modalName) => {
    setModalStates((prev) => ({ ...prev, [modalName]: false }));
  };

  const isModalVisible = (modalName) => modalStates[modalName] || false;

  return {
    showModal,
    hideModal,
    isModalVisible,
  };
};
