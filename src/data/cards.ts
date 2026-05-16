import { type SvgName } from '../ts/svg-data.ts';
import meditationIcon from '../assets/icons/meditation.svg';
import yogaIcon from '../assets/icons/yoga.svg';
import soundIcon from '../assets/icons/sound.svg';

export interface ICard {
  icon: string;
  title: string;
  text: string;
  wave: SvgName;
}

// данные карточек
export const cards: ICard[] = [
  {
    icon: meditationIcon,
    title: 'Meditation',
    text: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.',
    wave: 'wave1',
  },
  {
    icon: yogaIcon,
    title: 'Yoga',
    text: 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
    wave: 'wave2',
  },
  {
    icon: soundIcon,
    title: 'Sound',
    text: 'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing.',
    wave: 'wave3',
  },
];
