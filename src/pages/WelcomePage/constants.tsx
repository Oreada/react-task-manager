import { ReactComponent as AimRust } from './assets/aim-rust.svg';
import { ReactComponent as ClockRust } from './assets/clock-rust.svg';
import { ReactComponent as GlobalRust } from './assets/global-rust.svg';
import PhotoKatya from './assets/photo_katya.jpeg';
import PhotoOlya from './assets/photo_olya.jpg';
import PhotoSergey from './assets/photo_sergey.png';

export interface ICardContent {
  title: string;
  text: string;
  icon: JSX.Element;
}

export interface IDeveloperContent {
  name: string;
  link: string;
  icon: string;
  text: string;
}

export const CARD_CONTENT: ICardContent[] = [
  {
    title: 'advAimTitle',
    text: 'advAimText',
    icon: (
      <AimRust
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    ),
  },
  {
    title: 'advClockTitle',
    text: 'advClockText',
    icon: (
      <ClockRust
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    ),
  },
  {
    title: 'advGlobeTitle',
    text: 'advGlobeText',
    icon: (
      <GlobalRust
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    ),
  },
];

export const DEVELOPER_CONTENT: IDeveloperContent[] = [
  {
    name: 'Katya',
    link: 'https://github.com/KateBlazhko',
    text: 'teamKatya',
    icon: PhotoKatya,
  },
  {
    name: 'Sergey',
    link: 'https://github.com/ps0m',
    text: 'teamSergey',
    icon: PhotoSergey,
  },
  {
    name: 'Olya',
    link: 'https://github.com/Oreada',
    text: 'teamOlya',
    icon: PhotoOlya,
  },
];
