import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'memory', pathMatch: 'full' },
  
  { 
    path: 'memory', 
    loadComponent: () => import('./memory-game/memory-layout.component').then(m => m.MemoryLayoutComponent),
    children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { 
            path: 'home', 
            loadComponent: () => import('./memory-game/pages/home/home.component').then(m => m.HomeComponent) 
        },
        { 
            path: 'game', 
            loadComponent: () => import('./memory-game/pages/game/game.component').then(m => m.GameComponent) 
        },
        { 
            path: 'profile', 
            loadComponent: () => import('./memory-game/pages/profile/profile.component').then(m => m.ProfileComponent) 
        }
    ]
  },

  { 
    path: 'blagues', 
    loadComponent: () => import('src/app/blagues/components/joke-list/joke-list')
      .then(m => m.JokeListComponent)
  },

  { path: '**', redirectTo: 'memory' }
];