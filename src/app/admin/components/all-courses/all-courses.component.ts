import { Component } from '@angular/core';
import { AdminTableComponent } from '../../../Shared/admin-table/admin-table.component';
import { CourseService } from '../../services/course.service';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-all-courses',
  standalone: true,
  imports: [AdminTableComponent, RouterLink],
  templateUrl: './all-courses.component.html',
  styleUrl: './all-courses.component.scss'
})
export class AllCoursesComponent {
  courses: any[] = [];
  tableData: any[] = [];
  tableHeaders: string[] = ['id', 'title']; 

  constructor(private courseService: CourseService, private router: Router) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.tableData = this.courses.map(course => ({
          id: course.id,
          title: course.title,
          instructor: course.instructor?.name || 'N/A'
        }));
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
      }
    });
  }
  navigateToAddCourse(): void {
    this.router.navigate(['/admin/add-course']);
  }
}
