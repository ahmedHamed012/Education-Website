import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InstructorService } from '../../../Core/Services/instructors.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './instructor-profile.component.html',
  styleUrl: './instructor-profile.component.scss',
})
export class InstructorProfileComponent {
  @Input('instructor') instructorId: any;
  instructor: any;
  constructor(
    private readonly instructorService: InstructorService,
    private readonly router: Router
  ) {}
  ngOnInit() {
    this.instructorService.instructorDataSnippet.subscribe({
      next: (result) => {
        this.instructorService.getInstructorById(result).subscribe({
          next: (result) => {
            console.log(this.instructorId);
            this.instructor = result.data;
          },
          error: (err) => {},
        });
      },
      error: (err) => {},
    });
  }
  viewCourse(courseId: string) {
    const url = this.router
      .createUrlTree(['/student/course'], {
        queryParams: { courseId },
      })
      .toString();

    window.open(url, '_blank'); // Opens in a new tab
  }
}
