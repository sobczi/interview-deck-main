import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../../store/models/card';
import { Player } from '../../store/models/player.enum';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input() cards: Card[] = [];
  @Input() gameInProgress: boolean = true;
  @Input() currentWinner: Player | undefined;
  @Input() currentPlayer: Player = Player.first;
  @Output() pickedCardId = new EventEmitter<number>();
  @Output() restartGameClick = new EventEmitter<void>();

  readonly Player = Player;

  handleCardClick(cardId: number): void {
    this.pickedCardId.emit(cardId);
  }

  handleRestartGameClick(): void {
    this.restartGameClick.emit();
  }
}
