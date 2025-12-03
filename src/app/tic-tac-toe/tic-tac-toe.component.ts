import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-tic-tac-toe',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent {
  board: string[] = Array(9).fill('');
  currentPlayer: 'X' | 'O' = 'X';
  winner: string | null = null;
  isDraw: boolean = false;

  xScore = 0;
  oScore = 0;

  makeMove(index: number) {
    if (!this.board[index] && !this.winner) {
      this.board[index] = this.currentPlayer;
      this.checkWinner();
      if (!this.winner && !this.isDraw) {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

  checkWinner() {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        this.winner = this.board[a];
        this.updateScore(this.winner);
        return;
      }
    }

    if (!this.board.includes('')) {
      this.isDraw = true;
    }
  }

  updateScore(winner: string) {
    if (winner === 'X') this.xScore++;
    else this.oScore++;
  }

  resetGame() {
    this.board = Array(9).fill('');
    this.winner = null;
    this.isDraw = false;
    this.currentPlayer = 'X';
  }
}