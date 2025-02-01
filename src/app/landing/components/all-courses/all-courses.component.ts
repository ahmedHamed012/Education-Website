import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-all-courses',
  standalone: true,
  imports: [CommonModule, PaginatorModule],
  templateUrl: './all-courses.component.html',
  styleUrl: './all-courses.component.scss'
})
export class AllCoursesComponent {
  constructor(private readonly router: Router) {}
  courses = Array.from({ length: 12 }, () => ({
    image: 'assets/Images/related_course_4.png',
    author: 'Ahmed Ashour',
    title: 'Learn More About Web Design',
  }));

  onPageChange(event: any) {
    console.log('Page changed:', event.page);
    // Fetch data for the selected page
  }
  buyCourse(course: any) {
    this.router.navigate(['/home/buy-course']);
  }
}
