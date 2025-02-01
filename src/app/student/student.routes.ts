import { Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccountComponent } from './components/account/account.component';
import { AllCoursesComponent } from './components/all-courses/all-courses.component';
import { CartComponent } from './components/cart/cart.component';
import { GradesComponent } from './components/grades/grades.component';
import { PurchaseHistoryComponent } from './components/purchase-history/purchase-history.component';
import { RatesComponent } from './components/rates/rates.component';

export const routes: Routes =[
    {
        path:  '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: '',
        component: StudentComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                title: 'Learn on | Dashboard',
            },
            {
                path: 'account',
                component: AccountComponent,
                title: 'Learn on | Account',
            },
            {
                path: 'all-courses',
                component: AllCoursesComponent,
                title: 'Learn on | All Courses',
            },
            {
                path: 'cart',
                component: CartComponent,
                title: 'Learn on | Cart',
            },
            {
                path: 'grades',
                component: GradesComponent,
                title: 'Learn on | Grades',
            },
            {
                path: 'purchase-history',
                component: PurchaseHistoryComponent,
                title: 'Learn on | Purchase History',
            },
            {
                path: 'rates',
                component: RatesComponent,
                title: 'Learn on | Rates',
            },
        ]
    }
]