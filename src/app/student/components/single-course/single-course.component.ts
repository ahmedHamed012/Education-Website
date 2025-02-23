import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { DividerModule } from 'primeng/divider';
import { ProgressBarModule } from 'primeng/progressbar';
// For dynamic progressbar demo
import { ToastModule } from 'primeng/toast';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../../Core/Services/courses.service';
import { InstructorService } from '../../../Core/Services/instructors.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-course',
  standalone: true,
  imports: [
    AvatarModule,
    AvatarGroupModule,
    ProgressBarModule,
    ToastModule,
    DividerModule,
    CommonModule,
  ],
  templateUrl: './single-course.component.html',
  styleUrl: './single-course.component.scss',
})
export class SingleCourseComponent {
  constructor(
    private readonly router: Router,
    private activatedRoute: ActivatedRoute,
    private readonly courseService: CoursesService,
    private readonly instructorService: InstructorService
  ) {}
  itemsArray = Array(10);
  relatedCoursesArray = Array(4);
  courseInfo!: any;
  instructorInfo!: any;
  ratings!: any;
  studentFeedbacks!: any[];
  relatedCourses!: any[];
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      let courseId!: any;
      this.activatedRoute.queryParamMap.subscribe((params) => {
        courseId = params.get('courseId');
        this.courseService.getCourseById(courseId as string).subscribe({
          next: (result) => {
            this.courseInfo = result.data ?? result;
            this.ratings = this.courseInfo.course_rating.ratingPercentages;
            this.studentFeedbacks = this.courseInfo.students_feedbacks;
            this.instructorService
              .getInstructorById(this.courseInfo.instructor['id'])
              .subscribe({
                next: (result) => {
                  this.instructorInfo = result.data ?? result;
                },
              });
            this.courseService.getRelatedCourses(courseId as string).subscribe({
              next: (result) => {
                this.relatedCourses = result.related_courses ?? result;
              },
              error: (err) => {
                console.log(err);
              },
            });
          },
        });
      });
    });
  }
  getRatingsArray() {
    return Object.keys(this.ratings).map((key) => ({
      star: key,
      value: this.ratings[key],
    }));
  }

  getStarsArray(starCount: number) {
    return new Array(starCount);
  }

  getEmptyStarsArray(starCount: number) {
    return new Array(5 - starCount);
  }
  checkOutCourse() {
    this.router.navigate(['/student/cart']);
  }

  navigate(courseId: string) {
    const url = this.router
      .createUrlTree(['/student/course'], {
        queryParams: { courseId },
      })
      .toString();

    window.open(url, '_blank'); // Opens in a new tab
  }
}
