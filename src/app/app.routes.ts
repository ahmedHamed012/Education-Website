import { Route } from '@angular/router';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { InstructorsConsoleComponent } from './Components/instructors/instructors-console/instructors-console.component';
import { SignInComponent } from './Components/authentication/sign-in/sign-in.component';
import { SignUpComponent } from './Components/authentication/sign-up/sign-up.component';
import { StudentsConsoleComponent } from './Components/students/students-console/students-console.component';
import { AdminsConsoleComponent } from './Components/admins/admins-console/admins-console.component';
import { PurchaseConsoleComponent } from './Components/purchase/purchase-console/purchase-console.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { SingleCourseComponent } from './Components/courses/single-course/single-course.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { AllInstructorsComponent } from './Components/all-instructors/all-instructors.component';
import { FaqComponent } from './Components/faq/faq.component';
import { StudentDashboardComponent } from './Components/student-dashboard/student-dashboard.component';
import { AllCoursesComponent } from './Components/all-courses/all-courses.component';
import { CheckOutMethodComponent } from './Components/check-out-method/check-out-method.component';
import { PurchaseHistoryComponent } from './Components/purchase-history/purchase-history.component';
import { WatchCourseComponent } from './Components/watch-course/watch-course.component';
import { ProfileSettingComponent } from './Components/profile-setting/profile-setting.component';

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
        path: '',
        component: LandingPageComponent,
      },
      {
        path: 'instructors',
        component: AllInstructorsComponent,
      },
      {
        path: 'courses',
        component: AllCoursesComponent,
      },
      {
        path: 'contact-us',
        component: ContactUsComponent,
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
      },
      {
        path: 'faq',
        component: FaqComponent,
      },
      {
        path: 'profile-setting',
        component: ProfileSettingComponent,
      },
      {
        path: 'buy-course',
        component: SingleCourseComponent,
      },
      {
        path: 'check-out',
        component: CheckOutMethodComponent,
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
