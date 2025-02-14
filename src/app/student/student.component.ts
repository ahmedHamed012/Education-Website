import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../Shared/footer/footer.component';
import { LandingNavbarComponent } from '../landing/components/landing-navbar/landing-navbar.component';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [RouterModule, FooterComponent, LandingNavbarComponent],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss',
})
export class StudentComponent {}
