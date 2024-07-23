import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { cardPick, load } from './store/deck.actions';
import { TableComponent } from './components/table/table.component';
import { cards$, cardsLeftCounter$, currentPlayer$, firstPlayerScore$, secondPlayerScore$, currentWinner$ } from './store/deck.selectors';
import { Observable } from 'rxjs';
import { Card } from './store/models/card';
import { CommonModule } from '@angular/common';
import { Player } from './store/models/player.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly store = inject(Store);

  readonly cards$: Observable<Card[]> = this.store.select(cards$);
  readonly currentPlayer$: Observable<Player> = this.store.select(currentPlayer$);
  readonly cardsLeftCounter$: Observable<number> = this.store.select(cardsLeftCounter$);
  readonly firstPlayerScore$: Observable<number> = this.store.select(firstPlayerScore$);
  readonly secondPlayerScore$: Observable<number> = this.store.select(secondPlayerScore$);
  readonly currentWinner$: Observable<Player> = this.store.select(currentWinner$);

  readonly Player = Player;

  ngOnInit(): void {
    this.loadNewGame();
  }

  handleCardPick(cardId: number) {
    this.store.dispatch(cardPick({ cardId }));
  }

  handleRestartGameClick(): void {
    this.loadNewGame();
  }

  private loadNewGame(): void {
    this.store.dispatch(load());
  }
}
