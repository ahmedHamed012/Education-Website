import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from '../../../Core/Services/courses.service';
import { PaginatorModule } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { InstructorService } from '../../../Core/Services/instructors.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [CommonModule, PaginatorModule],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.scss',
})
export class MyCoursesComponent {
  constructor(
    private readonly router: Router,
    private readonly coursesService: CoursesService,
    private readonly instructorService: InstructorService
  ) {}
  courses: any[] = [];
  filteredCourses: any[] = []; // Array to hold filtered courses
  searchQuery: string = ''; // Variable to store the search query

  ngOnInit() {
    this.coursesService.getMyCourses().subscribe({
      next: (value) => {
        this.courses = value;
        this.courses.map((course) =>
          this.instructorService
            .getInstructorById(course.instructor_id)
            .pipe(map((value) => (course.instructor_name = value.data.name)))
            .subscribe(() => {})
        );
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
    this.coursesService.getCourseById(course.id).subscribe((result) => {
      console.log(result);
      this.router.navigate([`/student/lecture`], {
        queryParams: {
          courseId: course.id,
          lectureId: result.data.lectures[0].id,
        },
      });
    });
  }
}
