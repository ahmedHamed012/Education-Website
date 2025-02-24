import { Routes } from '@angular/router';
import { AuthenticationGuard } from './Core/Guards/auth.guard';
import { StudentRoutesGuard } from './Core/Guards/student.guard';
import { AdminRoutesGuard } from './Core/Guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./landing/landing.routes').then((m) => m.routes),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.routes),
  },
  {
    path: 'admin',
    canActivate: [AdminRoutesGuard],
    loadChildren: () => import('./admin/admin.routes').then((m) => m.routes),
  },
  {
    path: 'student',
    canActivate: [StudentRoutesGuard],
    loadChildren: () =>
      import('./student/student.routes').then((m) => m.routes),
  },
  // { path: 'instructor', loadChildren: () => import('./instructor/instructor.routes').then(m => m.routes) },
];
