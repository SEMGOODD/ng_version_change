import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MemoryCardComponent } from '../memory-card/memory-card.component'; 
import { GameService } from '../services/game.service';
import { Card } from 'src/app/card';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatRadioModule,
    MatButtonModule,
    MatDividerModule,
    MemoryCardComponent
  ],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  private gameService = inject(GameService); 

  cardCount: number = 8;
  cards: Card[] = [];
  boardWidth: number;

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.gameService.getCards(this.cardCount).subscribe(r => { 
      this.cards = r; 
      this.calulateWidth();
    });
  }

  calulateWidth(){
    this.boardWidth = this.cardCount / 2 * 90; 
  }
}