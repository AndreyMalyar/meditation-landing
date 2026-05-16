// Импорт стилей
import './styles/style.scss';
import { cards, type ICard } from './data/cards.ts';
import { getSvg, createElement } from './ts/utils.ts';

// Код приложения
const cardsBox = document.getElementById('cardsBox');

function getCard(card: ICard) {
  const currentCard = createElement('div', 'card');
  const cardBg = getSvg(card.wave);
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

// Здесь будет логика приложения
