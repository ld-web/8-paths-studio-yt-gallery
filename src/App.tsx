import { useReducer } from 'react';

import { initialState, ModalContext, modalReducer } from './context/modal';
import Modal from './Modal';
import Slider from './Slider';
import Title from './Title';

function App() {
  const [modalState, modalDispatch] = useReducer(modalReducer, initialState);

  return (
    <ModalContext.Provider
      value={{ state: modalState, dispatch: modalDispatch }}
    >
      <Title />
      <Slider />
      <Modal />
    </ModalContext.Provider>
  );
}

export default App;
