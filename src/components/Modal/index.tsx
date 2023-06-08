import { useContext } from 'react';

import { ModalAction, ModalContext } from '@/context/modal';

import close from './img/close.svg';
import { CloseButton, ModalBody, ModalContainer } from './modalStyles';

const Modal = () => {
  const { state: modalState, dispatch: modalDispatch } =
    useContext(ModalContext);

  const closeModal = () => {
    modalDispatch({ type: ModalAction.CLOSE_MODAL });
  };

  return (
    <ModalContainer
      className={modalState.visible ? 'visible' : 'hidden'}
      data-testid="modal-container"
    >
      <ModalBody>
        <CloseButton src={close} alt="Close" onClick={closeModal} />
        <iframe
          id="ytplayer"
          width="960"
          height="540"
          src={modalState.video?.embedUrl()}
        ></iframe>
      </ModalBody>
    </ModalContainer>
  );
};

export default Modal;
