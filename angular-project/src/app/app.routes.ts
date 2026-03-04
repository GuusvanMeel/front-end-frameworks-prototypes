import { Routes } from '@angular/router';
import { Marathons } from './pages/marathons/marathons';
import { Main } from './pages/main/main';

export const routes: Routes = [
{
    path: 'marathons',
    component: Marathons
  },

  {
    path: '',
    component: Main
  }

];
