import { Component, OnInit, Input, DoCheck } from '@angular/core';
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
export class MemoryCardComponent implements OnInit, DoCheck {

  constructor(private gameService: GameService) { }

  @Input() type!: string;
  @Input() code!: string;
  @Input() id!: number;

  icon: string[] = []; 
  
  isRotated: boolean = false;

  ngOnInit(): void {
    this.icon = [this.type, this.code]; 

    this.gameService.getCoveredCards().subscribe(r => 
      r.map(v => this.isRotated = (v.id == this.id) ? false : this.isRotated)
    );
  }

  ngDoCheck(): void {
    this.icon = [this.type, this.code];
  }

  undo() {
    this.isRotated = false;
  }

  onClick() {
    if (!this.isRotated) { 
      this.isRotated = true;
      this.gameService.controlCards({ id: this.id, code: this.code, type: this.type });
    }
  }
}