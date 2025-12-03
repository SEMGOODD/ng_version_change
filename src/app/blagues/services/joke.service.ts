import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest } from 'rxjs'; 
import { map } from 'rxjs/operators';
import { Joke, SearchResponse } from '../models/joke.model';
import { addFavorite, removeFavorite, allFavorites$, isFavoriteSync } from '../store/favorite.store';
import { user$ } from '../store/auth.store';
import { allHistory$, addToHistory } from '../store/history.store';

@Injectable({
  providedIn: 'root'
})
export class JokeService {
    private http = inject(HttpClient);
    private readonly API_URL = 'https://api.chucknorris.io/jokes';

    getRandomJoke(): Observable<Joke> {
        return this.http.get<Joke>(`${this.API_URL}/random`);
    }

    getJokeByCategory(category: string): Observable<Joke> {
        return this.http.get<Joke>(`${this.API_URL}/random?category=${category}`);
    }

    getCategories(): Observable<string[]>{
        return this.http.get<string[]>(`${this.API_URL}/categories`);
    }

    searchJokes(query: string): Observable<SearchResponse> {
        return this.http.get<SearchResponse>(`${this.API_URL}/search?query=${query}`);
    }

    getUserHistory(): Observable<Joke[]> {
        return combineLatest([user$, allHistory$]).pipe(
        map(([user, allLogs]) => {
            const username = user?.username || 'guest'; 
            return allLogs[username] || [];
        })
        );
    }

    addJokeToHistory(joke: Joke) {
        let currentUser: any;
        user$.subscribe(u => currentUser = u).unsubscribe();
        
        const username = currentUser?.username || 'guest';
        addToHistory(username, joke);
    }

    getUserFavorites(): Observable<Joke[]> {
        return combineLatest([user$, allFavorites$]).pipe(
            map(([user, allCollections]) => {
                if (!user || !user.username) {
                    return []; // Pas de user = Pas de favoris visibles
                }
                return allCollections[user.username] || [];
            })
        );
    }

    toggleFavorite(joke: Joke) {
        let currentUser: any;
        user$.subscribe(u => currentUser = u).unsubscribe();

        if (!currentUser) {
            alert("You must be logged in to save jokes!");
            return;
        }

        const username = currentUser.username;

        if (isFavoriteSync(username, joke.id)) {
            removeFavorite(username, joke.id);
        } else {
            addFavorite(username, joke);
        }
    }

    checkIfFavorite(jokeId: string): boolean {
        let currentUser: any;
        user$.subscribe(u => currentUser = u).unsubscribe();

        if (!currentUser) return false;
        return isFavoriteSync(currentUser.username, jokeId);
    }
}