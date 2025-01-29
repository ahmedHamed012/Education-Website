import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../Shared/navbar/navbar.component';
import { FooterComponent } from '../../Shared/footer/footer.component';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss',
})
export class StudentDashboardComponent {
  courses = [
    {
      category: 'Reiki Level I, II and Master/Teacher Program',
      title: '1. Introductions',
      image: 'assets/Images/related_course_1.png',
    },
    {
      category: 'Reiki Level I, II and Master/Teacher Program',
      title: '1. Introductions',
      image: 'assets/Images/related_course_2.png',
    },
    {
      category: 'Copywriting - Become a Freelance Copywriter',
      title: '1. How to get started with Figma',
      image: 'assets/Images/related_course_3.png',
    },
    {
      category: 'Copywriting - Become a Freelance Copywriter',
      title: '1. How to get started with Figma',
      image: 'assets/Images/related_course_4.png',
    },
  ];
}
