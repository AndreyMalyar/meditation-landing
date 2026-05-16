import { type SvgName } from '../ts/svg-data.ts';

export interface ICard {
  icon: string;
  title: string;
  text: string;
  wave: SvgName;
}

// данные карточек
export const cards: ICard[] = [
  {
    icon: '../assets/icons/meditation.svg',
    title: 'Meditation',
    text: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.',
    wave: 'wave1',
  },
  {
    icon: '../assets/icons/yoga.svg',
    title: 'Yoga',
    text: 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
    wave: 'wave2',
  },
  {
    icon: '../assets/icons/sound.svg',
    title: 'Sound',
    text: 'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing.',
    wave: 'wave3',
  },
];
