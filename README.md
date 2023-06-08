# 8 Paths Studio Youtube Gallery

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat-square&logo=react&logoColor=%2361DAFB)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=flat-square&logo=styled-components&logoColor=white)

## Data

Static, see `data/video.ts`.

> Will evolve to
> [Youtube API](https://developers.google.com/youtube/v3/docs/playlistItems/list)
> usage in the future

## Styled components

The idea here was to drive the slider items through the mouse scroll.

We first have a `SliderContainer` styled components, defined in
`src/components/Slider/sliderStyles.ts`.

Inside this container, for each video, we generate a `SliderItem`. We then
provide each item an index within the collection, and a scroll value to
calculate the amount of offset to be applied on it.

These properties are directly provided to the component, which can then receive
them and inject calculated values in attributes :

> src/components/Slider/sliderStyles.ts

```ts
export const GAP = 60;
export const WIDTH = 350;

interface SliderItemProps {
  idx: number;
  scrollValue: number;
}

export const SliderItem = styled.div.attrs<SliderItemProps>(
  ({ idx, scrollValue }) => ({
    style: {
      left: idx * (GAP + WIDTH) + scrollValue + 'px'
    }
  })
)<SliderItemProps>`
  position: absolute;
  width: ${WIDTH}px;
  transition: left 0.6s cubic-bezier(0.17, 0.67, 0.73, 1);

  & > img {
    width: ${WIDTH}px;
    transform: scale(1);
    filter: grayscale(1);
    transition: transform 0.2s ease-in-out, filter 0.2s ease-in-out;

    &:hover {
      filter: grayscale(0);
      transform: scale(1.2);
      cursor: pointer;
    }
  }
`;
```

So we can drive the `left` CSS property with a mouse wheel event handler :

> src/components/Slider/index.tsx

```jsx
const Slider = () => {
  const [scrollValue, setScrollValue] = useState(0);

  //...scrollMax...

  const scrollSlider: WheelEventHandler<HTMLDivElement> = e => {
    setScrollValue(current => {
      const out = current - e.deltaY - (e.deltaY > 0 ? 50 : -50);
      return out > 0 || out < scrollMax ? current : out;
    });
  };

  return (
    <SliderContainer onWheel={scrollSlider} data-testid="slider-container">
      {VIDEOS.map((video, index) => (
        <SliderItem key={video.id} idx={index} scrollValue={scrollValue}>
          <img src={video.thumbnailUrl()} alt="8 paths Studio" />
        </SliderItem>
      ))}
    </SliderContainer>
  );
};
```

## Context API

The `Slider` and the `Modal` components must both be able to know about the
video being played or not, and have the possibility to set/unset a video.

In this kind of situation, it's better to lift the state up : a `ModalContext`
was created in `src/context/modal.ts`, and some elements exported from it.

### Providing the Context

In the main `App` component, we use :

- `initialState` of the context (obviously, no video played, modal invisible)

```ts
export const initialState: ModalProps = {
  video: null,
  visible: false
};
```

- `ModalContext` itself, coming from the `React.createContext` function. The
  shape of the context is split into 2 properties : the state, and a dispatch
  function to modify it

```ts
export const ModalContext = React.createContext<{
  state: ModalProps;
  dispatch: React.Dispatch<ModalActions>;
}>({
  state: initialState,
  dispatch: () => null
});

/*
{
  state: initialState,
  dispatch: () => null
}

is just a default value in case we don't have any provider up
*/
```

Since the ModalContext comes from the `createContext` function, we now have a
provider (`ModalContext.Provider`) we can use in the main `App` component :

```jsx
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
```

The value we provide is an object containing the `modalState` and a `dispatch`
function coming from the `useReducer` hook.

- `modalReducer`, the reducer function used to generate new versions of the
  state.

It receives a `state` and an `action` to apply on it. It then returns a new
version of the state, which will be applied.

### The reducer action parameter

The action we pass to the reducer can any of the `ModalActions` union type. This
type is itself generated dynamically thanks to the help of Typescript.

#### Define the payloads

First, we defined which kinds of payloads we can accept, and put it into a new
type :

```ts
export enum ModalAction {
  CLOSE_MODAL = 'CLOSE_MODAL',
  SET_VIDEO = 'SET_VIDEO'
}

type ModalPayload = {
  [ModalAction.CLOSE_MODAL]: undefined;
  [ModalAction.SET_VIDEO]: Video;
};
```

So it basically says that I can "set a video", in which case I have to provide a
`Video` payload object to set it properly, or I can "close the modal", in which
case I don't need any payload or extra information about this action. In the
future, I can add more actions, and associated payloads.

#### Generate the authorized actions

We can now generate the Modal actions we authorize in the reducer with the
following type :

```ts
type ActionMap<Payload extends { [index: string]: any }> = {
  [Action in keyof Payload]: Payload[Action] extends undefined
    ? { type: Action }
    : { type: Action; payload: Payload[Action] };
};

export type ModalActions =
  ActionMap<ModalPayload>[keyof ActionMap<ModalPayload>];
```

The `ActionMap` expects a `Payload` generic in the form of
`[index: string]: any`. So it will be our `ModalPayload` type, since it's the
one associating an action name with the expected type.

It then iterates over **the keys** of the `Payload` : for us, `"CLOSE_MODAL"`,
and `"SET_VIDEO"` and injects :

- Either an object containing the action name alone, if there is no expected
  type (`undefined`)
- Or an object containing the action name, along with another `payload` property
  containing the expected type (for `SET_VIDEO`, it will resolve to
  `payload: Video`)

So the `ModalActions` type will be a **union** of the combinations :

```ts
type ModalActions =
  | {
      type: ModalAction.CLOSE_MODAL;
    }
  | {
      type: ModalAction.SET_VIDEO;
      payload: Video;
    };
```

#### Dispatch the actions

In either `Slider` or `Modal`, we can then dispatch the correct action with the
correct shape, enabling compile-time check :

```jsx
// Slider component
const itemClick = (video: Video) => {
  modalDispatch({ type: ModalAction.SET_VIDEO, payload: video });
};

// Modal component
const closeModal = () => {
  modalDispatch({ type: ModalAction.CLOSE_MODAL });
};
```
