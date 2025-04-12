import { Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccountComponent } from './components/account/account.component';
import { AllCoursesComponent } from './components/all-courses/all-courses.component';
import { CartComponent } from './components/cart/cart.component';
import { GradesComponent } from './components/grades/grades.component';
import { PurchaseHistoryComponent } from './components/purchase-history/purchase-history.component';
import { RatesComponent } from './components/rates/rates.component';
import { SingleCourseComponent } from './components/single-course/single-course.component';
import { SingleLectureComponent } from './components/single-lecture/single-lecture.component';
import { StudentRoutesGuard } from '../Core/Guards/student.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: StudentComponent,
    children: [
      {
        path: 'dashboard',
        canActivate: [StudentRoutesGuard],
        component: DashboardComponent,
        title: 'Learn on | Dashboard',
      },
      {
        path: 'account',
        canActivate: [StudentRoutesGuard],
        component: AccountComponent,
        title: 'Learn on | Account',
      },
      {
        path: 'all-courses',
        component: AllCoursesComponent,
        title: 'Learn on | All Courses',
      },
      {
        path: 'course',
        component: SingleCourseComponent,
        title: 'Learn on | Corse',
      },
      {
        path: 'lecture',
        component: SingleLectureComponent,
        title: 'Learn on | Corse',
      },
      {
        path: 'cart',
        canActivate: [StudentRoutesGuard],
        component: CartComponent,
        title: 'Learn on | Cart',
      },
      {
        path: 'grades',
        canActivate: [StudentRoutesGuard],
        component: GradesComponent,
        title: 'Learn on | Grades',
      },
      {
        path: 'purchase-history',
        canActivate: [StudentRoutesGuard],
        component: PurchaseHistoryComponent,
        title: 'Learn on | Purchase History',
      },
      {
        path: 'rates',
        canActivate: [StudentRoutesGuard],
        component: RatesComponent,
        title: 'Learn on | Rates',
      },
    ],
  },
];
