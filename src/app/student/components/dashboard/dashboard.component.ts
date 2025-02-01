import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
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
