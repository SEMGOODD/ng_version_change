import { createStore, withProps, select } from '@ngneat/elf';
import { Joke } from '../models/joke.model';

interface HistoryProps {
  collection: Record<string, Joke[]>;
}

const historyStore = createStore(
  { name: 'history' },
  withProps<HistoryProps>({ collection: {} })
);

export function addToHistory(username: string, joke: Joke) {
  historyStore.update((state) => {
    const userLogs = state.collection[username] || [];
    
    const newLogs = [joke, ...userLogs].slice(0, 10);

    return {
      ...state,
      collection: {
        ...state.collection,
        [username]: newLogs
      }
    };
  });
}

export function clearHistory(username: string) {
  historyStore.update((state) => ({
    ...state,
    collection: {
      ...state.collection,
      [username]: []
    }
  }));
}

export const allHistory$ = historyStore.pipe(select((state) => state.collection));