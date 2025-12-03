import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  games = [
    {
      title: 'Jeu de Mémoire',
      description: 'Exercez votre cerveau en retrouvant les paires de cartes.',
      icon: 'psychology', 
      link: '/memory/game',
      color: '#9c27b0'
    },
    {
      title: 'Zone de Blagues',
      description: 'Détendez-vous avec une liste de blagues aléatoires.',
      icon: 'sentiment_very_satisfied',
      link: '/blagues',
      color: '#ff9800' 
    },
    {
      title: 'Morpion (X / O)',
      description: 'Défiez un ami ou vous-même dans ce classique intemporel.',
      icon: 'grid_on',
      link: '/tictactoe',
      color: '#2196f3'
    }
  ];
}