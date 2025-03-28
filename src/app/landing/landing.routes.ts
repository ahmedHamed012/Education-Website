import { Routes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { FAQComponent } from './components/faq/faq.component';
import { AllCoursesComponent } from './components/all-courses/all-courses.component';
import { AllInstructorsComponent } from './components/all-instructors/all-instructors.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { InstructorProfileComponent } from './components/instructor-profile/instructor-profile.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        title: 'Learn-on | Home',
      },
      {
        path: 'about',
        component: AboutComponent,
        title: 'Learn-on | About us',
      },
      {
        path: 'contact',
        component: ContactComponent,
        title: 'Learn-on | Contact us',
      },
      {
        path: 'faq',
        component: FAQComponent,
        title: 'Learn-on | FAQ',
      },
      {
        path: 'all-courses',
        component: AllCoursesComponent,
        title: 'Learn-on | All Courses',
      },
      {
        path: 'my-courses',
        component: MyCoursesComponent,
        title: 'Learn-on | All Courses',
      },
      {
        path: 'all-instructors',
        component: AllInstructorsComponent,
        title: 'Learn-on | All Instructors',
      },
    ],
  },
];
