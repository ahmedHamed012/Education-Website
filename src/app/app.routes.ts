import { Route } from '@angular/router';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { InstructorsConsoleComponent } from './Components/instructors/instructors-console/instructors-console.component';
import { SignInComponent } from './Components/authentication/sign-in/sign-in.component';
import { SignUpComponent } from './Components/authentication/sign-up/sign-up.component';
import { StudentsConsoleComponent } from './Components/students/students-console/students-console.component';
import { AdminsConsoleComponent } from './Components/admins/admins-console/admins-console.component';
import { PurchaseConsoleComponent } from './Components/purchase/purchase-console/purchase-console.component';

export const routes: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePageComponent,
    children: [
      {
        path: 'instructors',
        component: InstructorsConsoleComponent,
      },
      {
        path: 'students',
        component: StudentsConsoleComponent,
      },
      {
        path: 'admins',
        component: AdminsConsoleComponent,
      },
      {
        path: 'purchases',
        component: PurchaseConsoleComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
    ],
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: SignInComponent,
      },
      {
        path: 'register',
        component: SignUpComponent,
      },
    ],
  },
];
