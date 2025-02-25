import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CoursesService } from '../../../Core/Services/courses.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InputTextModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public value!: string;
  public popularCourses!: any[];

  constructor(
    private readonly courseService: CoursesService,
    private readonly router: Router
  ) {}
  ngOnInit() {
    this.courseService.getPopularCourses().subscribe({
      next: (result) => {
        this.popularCourses = result.popular_courses;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  navigateToCourse(courseId: string) {
    this.router.navigate(['/student/course'], {
      queryParams: { courseId },
    });
  }
}
