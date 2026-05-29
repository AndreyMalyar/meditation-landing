// Импорт стилей
import './styles/style.scss';
import { cards, type ICard } from './data/cards.ts';
import { getSvgBg, getSvgIcon, createElement } from './ts/utils.ts';
import { MeditationScene } from './ts/MeditationScene.ts';
import { AudioVisualizer } from './ts/AudioVisualizer.ts';
import { tracks } from './data/tracks.ts';

// логика приложения
const cardsBox = document.getElementById('cardsBox');
const practiceList = document.getElementById('practiceList');
if (!practiceList) throw new Error('practiceList not found');
const practiceItemAll = practiceList.querySelectorAll('.practice__item');
const playStopList = document.querySelectorAll('.playStop');
if (!playStopList) throw new Error('playStop button not found');
const footerIconBox = document.getElementById('footerIconBox');
if (!footerIconBox) throw new Error('footerIconBox element not found');

function getCard(card: ICard) {
  const currentCard = createElement('div', 'card');
  const cardBg = getSvgBg(card.wave);
  cardBg.classList.add('card__bg');

  const cardContent = createElement('div', 'card__content');
  const cardLogo = createElement('img', 'card__logo') as HTMLImageElement;
  cardLogo.src = card.icon;
  const cardTitle = createElement('h3', 'card__title');
  cardTitle.textContent = card.title;
  const cardText = createElement('p', 'card__text');
  cardText.textContent = card.text;
  const cardBtn = createElement('buton', 'card__btn btn');
  cardBtn.textContent = 'Learn More';

  cardContent.append(cardLogo, cardTitle, cardText);

  currentCard.append(cardBg, cardContent, cardBtn);
  return currentCard;
}

cards.forEach((card: ICard) => {
  if (!cardsBox) throw new Error('cardsBox not found');
  const currentCard = getCard(card);
  cardsBox.append(currentCard);
});

function activateItem(item: Element) {
  practiceItemAll.forEach((el) => {
    el.classList.remove('practice__item_active');
    el.querySelector('.practice__item-bg')?.remove();
    el.querySelector('.practice__item-arrow')?.remove();
  });
  item.classList.add('practice__item_active');
  const itemBg = getSvgBg('wavePractice');
  itemBg.classList.add('practice__item-bg');
  const arrow = getSvgIcon('arrowRight');
  arrow.classList.add('practice__item-arrow');
  item.prepend(itemBg, arrow);
}

const firstItem = practiceList.querySelector('.practice__item');
if (firstItem) activateItem(firstItem);

practiceList.addEventListener('click', (evt) => {
  const target = evt.target as HTMLElement;
  if (target === evt.currentTarget) return;

  const currentItem = target.closest('.practice__item');
  if (!currentItem) return;
  if (firstItem) activateItem(currentItem);
});

function createFooterIcon() {
  const facebook = getSvgIcon('facebook', 'footer__icon');
  const instagram = getSvgIcon('instagram', 'footer__icon');
  const twitter = getSvgIcon('twitter', 'footer__icon');

  footerIconBox?.append(facebook, instagram, twitter);
}
createFooterIcon();

//Web Audio Api
playStopList.forEach((item, index) => {
  const play = getSvgIcon('play');
  play.classList.add('breath__item-icon');
  item.append(play);

  if (tracks[index]) {
    (item as HTMLElement).dataset.title = tracks[index].title;
  }
});
// END Web Audio Api

window.addEventListener('load', () => {
  const canvas = document.getElementById('headerCanvas') as HTMLCanvasElement;
  const context = canvas.getContext('2d')!;

  canvas.width = 350;
  canvas.height = 330;

  const meditationScene = new MeditationScene(canvas);
  meditationScene.init();

  const audioVisualizer = new AudioVisualizer();

  let lastTime = 0;
  function animate(timeStamp: number) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    meditationScene.render(context, deltaTime);
    audioVisualizer.render();

    requestAnimationFrame(animate);
  }
  animate(0);
});
