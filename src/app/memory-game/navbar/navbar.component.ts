import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    AsyncPipe
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private gameService = inject(GameService);
  private router = inject(Router);

  public remainingCardPairs$: Observable<number>;
  public doneMoves$: Observable<number>;

  public isOnGamePage: boolean = false;
  private routerSub: Subscription;

  ngOnInit(): void {
    this.remainingCardPairs$ = this.gameService.getRemainingCardPairs();
    this.doneMoves$ = this.gameService.getDoneMoves();

    this.routerSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isOnGamePage = (event.url === '/game');
    });

    this.isOnGamePage = (this.router.url === '/game');
  }

  ngOnDestroy(): void {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }

  resetGame(): void {
    window.location.reload(); 
  }
}