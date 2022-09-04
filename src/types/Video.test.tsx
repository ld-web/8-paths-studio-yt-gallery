import Video from './Video';

let video: Video;

beforeAll(() => {
  video = new Video('testid');
});

test('Video thumbnail url', () => {
  expect(video.thumbnailUrl()).toEqual(
    'https://img.youtube.com/vi/testid/hqdefault.jpg'
  );
});

test('Video embed url', () => {
  expect(video.embedUrl()).toEqual(
    'https://www.youtube.com/embed/testid?autoplay=1'
  );
});
