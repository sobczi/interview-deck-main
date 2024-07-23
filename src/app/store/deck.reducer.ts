import { createReducer, on } from '@ngrx/store';
import { DeckState } from './deck.models';
import { cardPick, load, loadSuccess, switchPlayerTurn } from './deck.actions';
import { Player } from './models/player.enum';
import { Card } from './models/card';
import { convertCardValueToNumber } from './utils/convert-card-value-to-number';

export const initialState: DeckState = {
  currentPlayer: Player.first,
  firstPlayerScore: 0,
  secondPlayerScore: 0,
  cards: [],
};

export const deckReducer = createReducer(
  initialState,
  on(load, (state) => ({ ...state })),
  on(loadSuccess, (_, { cards }) => ({ currentPlayer: Player.first, firstPlayerScore: 0, secondPlayerScore: 0, cards })),
  on(cardPick, (state, { cardId }) => {
    const foundIndex = state.cards.findIndex((card: Card) => card.id === cardId);
    const cards = JSON.parse(JSON.stringify(state.cards));
    let firstPlayerScore = state.firstPlayerScore;
    let secondPlayerScore = state.secondPlayerScore;

    if (foundIndex !== -1) {
      cards[foundIndex].pickedBy = state.currentPlayer;

      if (state.currentPlayer === Player.first) {
        firstPlayerScore += convertCardValueToNumber(cards[foundIndex].value);
      } else {
        secondPlayerScore += convertCardValueToNumber(cards[foundIndex].value);
      }
    }

    return {
      ...state,
      firstPlayerScore,
      secondPlayerScore,
      cards,
    }
  }),
  on(switchPlayerTurn, (state) => ({ ...state, currentPlayer: state.currentPlayer === Player.first ? Player.second : Player.first })),
);
