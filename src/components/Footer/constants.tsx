// import { JSX } from 'react';
import GitHubLogo from './assets/git-hub-logo.svg';
import LogoRSS from './assets/rs_school_js.svg';

interface IDeveloperContent {
  name: string;
  link: string;
  imgSrc: string;
  imgAlt: string;
  imgWidth: string;
}

export const FOOTER_CONTENT: IDeveloperContent[] = [
  {
    name: 'nameKatya',
    link: 'https://github.com/KateBlazhko',
    imgSrc: GitHubLogo,
    imgAlt: 'Logo GitHub',
    imgWidth: '30px',
  },
  {
    name: 'nameSergey',
    link: 'https://github.com/ps0m',
    imgSrc: GitHubLogo,
    imgAlt: 'Logo GitHub',
    imgWidth: '30px',
  },
  {
    name: 'nameOlya',
    link: 'https://github.com/Oreada',
    imgSrc: GitHubLogo,
    imgAlt: 'Logo GitHub',
    imgWidth: '30px',
  },
  {
    name: 'year',
    link: 'https://rs.school/react',
    imgSrc: LogoRSS,
    imgAlt: 'Logo RSSchool',
    imgWidth: '80px',
  },
];
