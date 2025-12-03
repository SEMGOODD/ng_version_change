import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JokeService } from '../../services/joke.service';
import { Joke } from '../../models/joke.model';
import { Observable } from 'rxjs';
import { user$, isLoggedIn$, login, logout } from '../../store/auth.store';

@Component({
  selector: 'app-joke-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './joke-list.html',
  styleUrls: ['./joke-list.component.css']
})

export class JokeListComponent implements OnInit {
  private jokeService = inject(JokeService);

  jokes: Joke[] = [];         // Liste des blagues affichées
  categories: string[] = [];  // Liste des catégories pour le filtre
  searchTerm: string = '';    // Texte de la recherche
  selectedCategory: string = ''; // Catégorie sélectionnée
  isLoading: boolean = false; // Indicateur de chargement
  favorites$: Observable<Joke[]> = this.jokeService.getUserFavorites();
  currentUser$ = user$;
  isLoggedIn$ = isLoggedIn$;
  history$: Observable<Joke[]> = this.jokeService.getUserHistory();
  usernameInput: string = '';
  
  ngOnInit(): void {
    this.loadCategories();
    this.getNewRandomJoke();
  }
  getCategoryEmoji(categories: string[]): string {
    if (!categories || categories.length === 0) return '🤠';

    const category = categories[0];

    const emojiMap: { [key: string]: string } = {
      'animal': '🐻',
      'career': '💼',
      'celebrity': '😎',
      'dev': '💻',
      'explicit': '🤬',
      'fashion': '🎩',
      'food': '🍗',
      'history': '📜',
      'money': '💸',
      'movie': '🎬',
      'music': '🎸',
      'political': '⚖️',
      'religion': '🙏',
      'science': '🧪',
      'sport': '🥊',
      'travel': '✈️'
    };

    return emojiMap[category] || '🤠';
  }

  loadCategories() {
    this.jokeService.getCategories().subscribe(cats => this.categories = cats);
  }

  getNewRandomJoke() {
      this.isLoading = true;

      this.jokeService.getRandomJoke().subscribe({
        next: (joke) => {
          this.jokes = [joke];
          this.isLoading = false;
          
          this.jokeService.addJokeToHistory(joke); 
        },
        error: () => this.isLoading = false
      });
    }

  onLogin() {
    if (this.usernameInput.trim()) {
      login(this.usernameInput);
      this.usernameInput = '';
    }
  }

  onLogout() {
    logout();
  }

  onSearch() {
    if (this.searchTerm.length < 3) return
    
    this.isLoading = true;
    this.jokeService.searchJokes(this.searchTerm).subscribe({
      next: (response) => {
        this.jokes = response.result;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  onCategoryChange(event: any) {
    const category = event.target.value;
    if (!category) return;

    this.isLoading = true;
    this.searchTerm = '';

    this.jokeService.getJokeByCategory(category).subscribe({
      next: (joke) => {
        this.jokes = [joke];
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  toggleFav(joke: Joke) {
    this.jokeService.toggleFavorite(joke);
  }

  isFav(joke: Joke): boolean {
    return this.jokeService.checkIfFavorite(joke.id);
  }
}