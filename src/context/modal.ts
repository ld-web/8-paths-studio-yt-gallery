import React from 'react';

export interface ModalProps {
  videoId: string | null;
  visible?: boolean;
}

export enum ModalAction {
  CLOSE_MODAL = 'CLOSE_MODAL',
  SET_VIDEO = 'SET_VIDEO'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

type ModalPayload = {
  [ModalAction.CLOSE_MODAL]: undefined;
  [ModalAction.SET_VIDEO]: string;
};

export type ModalActions =
  ActionMap<ModalPayload>[keyof ActionMap<ModalPayload>];

export const initialState: ModalProps = {
  videoId: null,
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
        videoId: null,
        visible: false
      };
    case ModalAction.SET_VIDEO:
      return {
        videoId: action.payload,
        visible: true
      };
    default:
      return state;
  }
};
