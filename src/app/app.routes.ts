import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'stack-form',
    loadComponent: () => import('./home/stack-form/stack-form.page').then( m => m.StackFormPage)
  },
  {
    path: 'stack-details/:id',
    loadComponent: () => import('./stack-details/stack-details.page').then( m => m.StackDetailsPage)
  },
  {
    path: 'stack-learn/:id/:learned',
    loadComponent: () => import('./stack-learn/stack-learn.page').then( m => m.StackLearnPage)
  },
];
