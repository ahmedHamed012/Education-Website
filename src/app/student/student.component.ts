import { Component } from '@angular/core';
import { StudentNavbarComponent } from "./components/student-navbar/student-navbar.component";
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../Shared/footer/footer.component';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [StudentNavbarComponent, RouterModule, FooterComponent],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent {

}
