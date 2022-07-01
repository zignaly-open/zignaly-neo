import { useState } from 'react';

const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalId, setModalId] = useState('');

  function toggle() {
    setShowModal(!showModal);
  }

  return {
    showModal,
    modalId,
    setModalId,
    toggle,
  };
};

export default useModal;
