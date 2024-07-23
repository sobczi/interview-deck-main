import { Card } from './models/card';
import { Player } from './models/player.enum';

export interface DeckState {
  currentPlayer: Player;
  cards: Card[];
  firstPlayerScore: number;
  secondPlayerScore: number;
}
