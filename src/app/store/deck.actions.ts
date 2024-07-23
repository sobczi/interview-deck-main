import { createAction, props } from '@ngrx/store';
import { Card } from './models/card';

export const load = createAction('[Deck] Load');
export const loadSuccess = createAction(
  '[Deck] Load Success',
  props<{ cards: Card[] }>()
);
export const cardPick = createAction(
  '[Deck] Card Pick',
  props<{ cardId: number }>()
)
export const switchPlayerTurn = createAction('[Deck] New Turn');