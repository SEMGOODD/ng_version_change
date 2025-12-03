import { createStore, withProps, select } from '@ngneat/elf';
import { persistState, localStorageStrategy } from '@ngneat/elf-persist-state';
import { Joke } from '../models/joke.model';

interface FavoriteProps {
  collection: Record<string, Joke[]>; 
}

const store = createStore(
  { name: 'favorites' },
  withProps<FavoriteProps>({ collection: {} })
);

export const persist = persistState(store, {
  key: 'multi-user-favorites', // une clé pour éviter les conflits
  storage: localStorageStrategy,
});

/* --- ACTIONS --- */

export function addFavorite(username: string, joke: Joke) {
  store.update((state) => {
    const userList = state.collection[username] || [];
    
    return {
      ...state,
      collection: {
        ...state.collection,
        [username]: [...userList, joke]
      }
    };
  });
}

export function removeFavorite(username: string, jokeId: string) {
  store.update((state) => {
    const userList = state.collection[username] || [];
    return {
      ...state,
      collection: {
        ...state.collection,
        [username]: userList.filter(j => j.id !== jokeId)
      }
    };
  });
}

/* --- SELECTOR pour récupérer tout le store pour le filtrer plus tard --- */
export const allFavorites$ = store.pipe(select((state) => state.collection));

// Helper pour vérifier
export function isFavoriteSync(username: string, jokeId: string): boolean {
  const state = store.getValue();
  const userList = state.collection[username];
  if (!userList) return false;
  return userList.some(j => j.id === jokeId);
}