import { useContext, useEffect, useState, WheelEventHandler } from 'react';

import { ModalAction, ModalContext } from './context/modal';
import VIDEOS from './data/video';
import { GAP, SliderContainer, SliderItem, WIDTH } from './sliderStyles';

const Slider = () => {
  const { dispatch: modalDispatch } = useContext(ModalContext);

  const calculateMaxScroll = () =>
    -(GAP + WIDTH) * VIDEOS.length + window.innerWidth;

  const [scrollValue, setScrollValue] = useState(0);
  const [scrollMax, setScrollMax] = useState(calculateMaxScroll());

  useEffect(() => {
    function setScrollOnResize() {
      setScrollMax(calculateMaxScroll());
    }
    window.addEventListener('resize', setScrollOnResize);

    return () => {
      window.removeEventListener('resize', setScrollOnResize);
    };
  }, []);

  const scrollSlider: WheelEventHandler<HTMLDivElement> = e => {
    setScrollValue(current => {
      const out = current - e.deltaY - (e.deltaY > 0 ? 50 : -50);
      return out > 0 || out < scrollMax ? current : out;
    });
  };

  const itemClick = (videoId: string) => {
    modalDispatch({ type: ModalAction.SET_VIDEO, payload: videoId });
  };

  return (
    <SliderContainer onWheel={scrollSlider} data-testid="slider-container">
      {VIDEOS.map((video, index) => (
        <SliderItem
          key={video.id}
          idx={index}
          scrollValue={scrollValue}
          onClick={() => itemClick(video.id)}
        >
          <img src={video.thumbnailUrl()} alt="8 paths Studio" />
        </SliderItem>
      ))}
    </SliderContainer>
  );
};

export default Slider;
