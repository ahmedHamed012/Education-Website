import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { CoursesService } from '../../../Core/Services/courses.service';

@Component({
  selector: 'app-all-courses',
  standalone: true,
  imports: [CommonModule, PaginatorModule],
  templateUrl: './all-courses.component.html',
  styleUrl: './all-courses.component.scss',
})
export class AllCoursesComponent {
  constructor(
    private readonly router: Router,
    private readonly coursesService: CoursesService
  ) {}
  courses: any[] = [];
  filteredCourses: any[] = []; // Array to hold filtered courses
  searchQuery: string = ''; // Variable to store the search query

  ngOnInit() {
    this.coursesService.getAllCorses().subscribe({
      next: (value) => {
        this.courses = value.data;
        this.filteredCourses = this.courses; // Initialize filteredCourses with all courses
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onPageChange(event: any) {
    console.log('Page changed:', event.page);
    // Fetch data for the selected page
  }

  searchCourses(): void {
    if (!this.searchQuery) {
      this.filteredCourses = this.courses; // If search query is empty, show all courses
      return;
    }

    const query = this.searchQuery.toLowerCase(); // Convert query to lowercase for case-insensitive search
    this.filteredCourses = this.courses.filter(
      (course) =>
        course.title.toLowerCase().includes(query) || // Search by title
        course.instructor_name.toLowerCase().includes(query) // Search by instructor
    );
  }

  buyCourse(course: any) {
    this.router.navigate([`/student/course`], {
      queryParams: { courseId: course.id },
    });
  }
}
