import React from 'react';

import Video from '../types/Video';
export interface ModalProps {
  video: Video | null;
  visible?: boolean;
}

export enum ModalAction {
  CLOSE_MODAL = 'CLOSE_MODAL',
  SET_VIDEO = 'SET_VIDEO'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? { type: Key }
    : { type: Key; payload: M[Key] };
};

type ModalPayload = {
  [ModalAction.CLOSE_MODAL]: undefined;
  [ModalAction.SET_VIDEO]: Video;
};

export type ModalActions =
  ActionMap<ModalPayload>[keyof ActionMap<ModalPayload>];

export const initialState: ModalProps = {
  video: null,
  visible: false
};

export const ModalContext = React.createContext<{
  state: ModalProps;
  dispatch: React.Dispatch<ModalActions>;
}>({
  state: initialState,
  dispatch: () => null
});

export const modalReducer = (
  state: ModalProps,
  action: ModalActions
): ModalProps => {
  switch (action.type) {
    case ModalAction.CLOSE_MODAL:
      return {
        video: null,
        visible: false
      };
    case ModalAction.SET_VIDEO:
      return {
        video: action.payload,
        visible: true
      };
    default:
      return state;
  }
};
