import styled from 'styled-components';

export const SliderContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 270px;
`;

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
