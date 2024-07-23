import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { cardPick, load, loadSuccess, switchPlayerTurn } from './deck.actions';
import { map, switchMap } from 'rxjs';
import { CardsApiService } from './services/cards-api.service';
import { Card } from './models/card';

@Injectable()
export class DeckEffects {
  load$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(load),
        switchMap(() => this._cardsApiService.startNewDeck()),
        switchMap((deckId: string) => this._cardsApiService.shuffleDeck(deckId)),
        switchMap((deckId: string) =>
          this._cardsApiService.drawAllCards(deckId)
        ),
        map((cards: Card[]) => loadSuccess({ cards }))
      )
  );

  cardPick$ = createEffect(() => this.actions$.pipe(
    ofType(cardPick),
    map(() => switchPlayerTurn()),
  ));

  private readonly _cardsApiService = inject(CardsApiService);

  constructor(private actions$: Actions) {}
}
