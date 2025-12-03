import { createStore, withProps, select } from '@ngneat/elf';
import { persistState, localStorageStrategy } from '@ngneat/elf-persist-state';

export interface User {
  username: string;
  avatar: string;
  isLoggedIn: boolean;
}

interface AuthProps {
  user: User | null;
}

const authStore = createStore(
  { name: 'auth' },
  withProps<AuthProps>({ user: null })
);

// Pour sauvegarder la session pour chaque utilisateur
export const persist = persistState(authStore, {
  key: 'auth-session',
  storage: localStorageStrategy,
});

/* --- ACTIONS --- */

export function login(username: string) {
  authStore.update((state) => ({
    ...state,
    user: {
      username,
      avatar: `https://robohash.org/${username}?set=set3`, 
      isLoggedIn: true
    }
  }));
}

export function logout() {
  authStore.update((state) => ({ ...state, user: null }));
}

/* --- SELECTORS --- */
export const user$ = authStore.pipe(select((state) => state.user));
export const isLoggedIn$ = authStore.pipe(select((state) => state.user?.isLoggedIn));