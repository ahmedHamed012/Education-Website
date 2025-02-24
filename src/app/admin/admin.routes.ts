import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AllCoursesComponent } from './components/all-courses/all-courses.component';
import { AllInstructorsComponent } from './components/all-instructors/all-instructors.component';
import { AllStudentsComponent } from './components/all-students/all-students.component';
import { AllCategoriesComponent } from './components/all-categories/all-categories.component';
import { AllAdminsComponent } from './components/all-admins/all-admins.component';
import { AllPurchasesComponent } from './components/all-purchases/all-purchases.component';
import { AccountComponent } from './components/account/account.component';
import { AdminRoutesGuard } from '../Core/Guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Learn-on | Dashboard',
      },
      {
        path: 'all-courses',
        component: AllCoursesComponent,
        title: 'Learn-on | All Courses',
      },
      {
        path: 'all-instructors',
        component: AllInstructorsComponent,
        title: 'Learn-on | All Instructors',
      },
      {
        path: 'all-students',
        component: AllStudentsComponent,
        title: 'Learn-on | All Students',
      },
      {
        path: 'all-categories',
        component: AllCategoriesComponent,
        title: 'Learn-on | All Categories',
      },
      {
        path: 'all-admins',
        component: AllAdminsComponent,
        title: 'Learn-on | All Admins',
      },
      {
        path: 'all-purchases',
        component: AllPurchasesComponent,
        title: 'Learn-on | All Purchases',
      },
      {
        path: 'account',
        component: AccountComponent,
        title: 'Learn-on | Account',
      },
    ],
  },
];
