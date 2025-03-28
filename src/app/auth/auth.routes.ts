import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthComponent } from './auth.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: SignInComponent,
        title: 'Learn-on | Login',
      },
      {
        path: 'register',
        component: SignUpComponent,
        title: 'Learn-on | Register',
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
        title: 'Learn-on | Reset Password',
      },
    ],
  },
];
