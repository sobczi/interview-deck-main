import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DeckState } from './deck.models';
import { Card } from './models/card';
import { Player } from './models/player.enum';

const deck$ = createFeatureSelector<DeckState>('deck');

export const cards$ = createSelector(deck$, (state) => state.cards);
export const currentPlayer$ = createSelector(deck$, (state) => state.currentPlayer);
export const cardsLeftCounter$ = createSelector(deck$, (state) => state.cards.filter((card: Card) => !card.pickedBy).length);
export const firstPlayerScore$ = createSelector(deck$, (state) => state.firstPlayerScore);
export const secondPlayerScore$ = createSelector(deck$, (state) => state.secondPlayerScore);
export const currentWinner$ = createSelector(deck$, (state) => state.firstPlayerScore > state.secondPlayerScore ? Player.first : Player.second);
