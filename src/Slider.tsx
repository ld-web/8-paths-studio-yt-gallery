import { useEffect, useState, WheelEventHandler } from 'react';
import styled from 'styled-components';

import VIDEOS from './data/video';

const SliderContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 270px;
`;

interface SliderItemProps {
  idx: number;
  scroll: number;
}

const GAP = 60;
const WIDTH = 350;

const SliderItem = styled.div.attrs<SliderItemProps>(({ idx, scroll }) => ({
  style: {
    left: idx * (GAP + WIDTH) + scroll + 'px'
  }
}))<SliderItemProps>`
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

const Slider = () => {
  const calculateMaxScroll = () =>
    -(GAP + WIDTH) * VIDEOS.length + window.innerWidth;

  const [scroll, setScroll] = useState(0);
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

  useEffect(() => {
    console.log('scroll max', scrollMax);
  }, [scrollMax]);

  const scrollSlider: WheelEventHandler<HTMLDivElement> = e => {
    setScroll(current => {
      const out = current - e.deltaY - (e.deltaY > 0 ? 50 : -50);
      return out > 0 || out < scrollMax ? current : out;
    });
  };

  return (
    <SliderContainer onWheel={scrollSlider}>
      {VIDEOS.map((video, index) => (
        <SliderItem key={video.id} idx={index} scroll={scroll}>
          <img src={video.thumbnailUrl()} alt="8 paths Studio" />
        </SliderItem>
      ))}
    </SliderContainer>
  );
};

export default Slider;
