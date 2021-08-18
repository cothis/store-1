import { useState, useEffect } from 'react';

const useModal = (): [modal: boolean, setModal: (bool: boolean) => void] => {
  const [modal, setModal] = useState<boolean>(false);
  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : 'auto';
  }, [modal]);

  return [modal, setModal];
};

export default useModal;
