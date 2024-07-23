import { inject, Injectable } from '@angular/core';
// TODO: Add typing with @
import { Card } from '../models/card';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface BaseDeckResponse {
  success: boolean;
  deck_id: string;
  remaining: string; // number
}

interface DrawCardsResponse extends BaseDeckResponse {
  cards: Card[];
}

interface StartNewDeckResponse extends BaseDeckResponse {
  shuffled: boolean;
}

interface ShuffleResponse extends BaseDeckResponse {
  shuffled: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CardsApiService {
  private readonly _httpClient = inject(HttpClient);

  startNewDeck(): Observable<string> {
    return this._httpClient
      .get<StartNewDeckResponse>(`https://deckofcardsapi.com/api/deck/new/`)
      .pipe(map((response: StartNewDeckResponse) => response.deck_id));
  }

  shuffleDeck(deckId: string): Observable<string> {
    return this._httpClient.get<ShuffleResponse>(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`).pipe(
      map((response: ShuffleResponse) => response.deck_id),
    );
  }

  drawAllCards(deckId: string): Observable<Card[]> {
    const allCardsCount = 52;
    return this._httpClient
      .get<DrawCardsResponse>(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${allCardsCount}`
      )
      .pipe(
        map((response: DrawCardsResponse) => response.cards.map((card: Card, id: number) => ({ ...card, id })))
      );
  }
}
