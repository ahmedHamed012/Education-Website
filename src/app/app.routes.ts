import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./landing/landing.routes').then(m => m.routes) },
  { path: 'auth', loadChildren: () => import('./auth/auth.routes').then(m => m.routes) },
  { path: 'admin', loadChildren: () => import('./admin/admin.routes').then(m => m.routes) },
  { path: 'student', loadChildren: () => import('./student/student.routes').then(m => m.routes) },
  // { path: 'instructor', loadChildren: () => import('./instructor/instructor.routes').then(m => m.routes) },
];