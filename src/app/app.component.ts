import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="accent">
      <span>Welcome to our super multi game platform</span>
      <span class="spacer" style="flex: 1 1 auto;"></span>
      
      <a mat-button routerLink="/memory" routerLinkActive="active">Jeu de Mémoire</a>
      <a mat-button routerLink="/blagues" routerLinkActive="active">Blagues</a>
      <a mat-button routerLink="/tictactoe" routerLinkActive="active">Morpion</a>
    </mat-toolbar>

    <div> 
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .active { background: rgba(255,255,255, 0.2); }
  `]
})
export class AppComponent {}