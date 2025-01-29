import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { NavbarComponent } from '../../Shared/navbar/navbar.component';
import { FooterComponent } from '../../Shared/footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-courses',
  standalone: true,
  imports: [CommonModule, PaginatorModule],
  templateUrl: './all-courses.component.html',
  styleUrl: './all-courses.component.scss',
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
