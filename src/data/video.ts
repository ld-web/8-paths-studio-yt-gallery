import Video from '../types/Video';

const videoIds: string[] = [
  'TuxOV2VLab8',
  'dj0OIxgGRts',
  'firh0QGlyL0',
  'UwadYQHqDhU',
  'e0-DUVsI16Q',
  'q5hpci_ME6U',
  'qOb_-_VRdOY',
  'VGvcdjyvenw',
  'QkEepjP-uzw',
  'H259s4BeIKk',
  'sBj6JstyJEU',
  'rLwLX3aD4TI',
  '7pYL3JfuHWs',
  '3omVRmHAvMY'
];

const VIDEOS = videoIds.map(id => {
  return new Video(id);
});

export default VIDEOS;
