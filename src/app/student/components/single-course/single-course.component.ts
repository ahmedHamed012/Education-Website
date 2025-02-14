import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { DividerModule } from 'primeng/divider';
import { ProgressBarModule } from 'primeng/progressbar';
// For dynamic progressbar demo
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-course',
  standalone: true,
  imports: [
    AvatarModule,
    AvatarGroupModule,
    ProgressBarModule,
    ToastModule,
    DividerModule,
  ],
  templateUrl: './single-course.component.html',
  styleUrl: './single-course.component.scss',
})
export class SingleCourseComponent {
  constructor(private readonly router: Router) {}
  itemsArray = Array(10);
  relatedCoursesArray = Array(4);
  checkOutCourse() {
    this.router.navigate(['/student/cart']);
  }
}
