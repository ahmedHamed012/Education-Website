import { Route } from '@angular/router';
import { HomePageComponent } from './Components/home-page/home-page.component';

export const routes: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
];
