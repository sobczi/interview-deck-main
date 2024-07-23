import { CardValue } from "./card-value";
import { Player } from "./player.enum";

export interface Card {
  // TODO: Does not exist in response
  id: number;
  code: string;
  image: string;
  // TODO: Separate type
  images: {
    svg: string;
    png: string;
  };
  value: CardValue;
  // TODO: Separate enum
  suit: 'Spades' | 'Diamonds' | 'Clubs' | 'Hearts';
  // TODO: Does not exist in response
  pickedBy?: Player;
}
