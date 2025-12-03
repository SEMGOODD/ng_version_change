import { Component, OnInit, Input, DoCheck, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GameService } from '../services/game.service';

@Component({
  selector: 'memory-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './memory-card.component.html',
  styleUrls: ['./memory-card.component.scss']
})
export class MemoryCardComponent implements OnInit, OnChanges {

  constructor(private gameService: GameService) { }

  @Input() type!: string;
  @Input() code!: string;
  @Input() id!: number;

  icon: string[] = []; 
  isRotated: boolean = false;

  ngOnInit(): void {
      this.gameService.getCoveredCards().subscribe(r => {
        r.forEach(v => {
          if (v.id === this.id) {
            this.isRotated = false;
          }
        });
      });
    }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['code'] || changes['type']) {
      this.icon = [this.type, this.code];
      this.isRotated = false;
    }
  }

  onClick() {
    if (!this.isRotated) {
      this.isRotated = true;
      this.gameService.controlCards({ id: this.id, code: this.code, type: this.type });
    }
  }
}