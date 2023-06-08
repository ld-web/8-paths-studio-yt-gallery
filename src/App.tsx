import { useReducer } from 'react';

import Modal from './components/Modal';
import Slider from './components/Slider';
import Title from './components/Title';
import { initialState, ModalContext, modalReducer } from './context/modal';

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
