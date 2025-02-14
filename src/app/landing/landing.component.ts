import { Component } from '@angular/core';
import { LandingNavbarComponent } from './components/landing-navbar/landing-navbar.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../Shared/footer/footer.component';
import { StudentNavbarComponent } from '../student/components/student-navbar/student-navbar.component';

@Component({
  standalone: true,
  selector: 'app-landing',
  imports: [
    LandingNavbarComponent,
    RouterModule,
    FooterComponent,
    StudentNavbarComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {}
