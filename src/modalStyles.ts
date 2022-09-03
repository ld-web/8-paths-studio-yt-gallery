import styled from 'styled-components';

export const ModalContainer = styled.div`
  opacity: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  transition: all 0.5s ease-in-out;

  &.visible {
    opacity: 1;
    pointer-events: all;
  }
`;

export const ModalBody = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

export const CloseButton = styled.img`
  width: 35px;
  transform: scale(1);
  transition: transform 0.1s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.3);
  }
`;
