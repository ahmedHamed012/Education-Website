import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { DividerModule } from 'primeng/divider';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../../Core/Services/courses.service';
import { LectureService } from '../../../Core/Services/lecture.service';
@Component({
  selector: 'app-single-lecture',
  standalone: true,
  imports: [CommonModule, AvatarModule, AvatarGroupModule, DividerModule],
  templateUrl: './single-lecture.component.html',
  styleUrl: './single-lecture.component.scss',
})
export class SingleLectureComponent {
  constructor(
    private readonly router: Router,
    private activatedRoute: ActivatedRoute,
    private readonly courseService: CoursesService,
    private readonly lectureService: LectureService,
    private readonly location: Location
  ) {}
  courseInfo!: any;
  ratings!: any;
  studentFeedbacks!: any[];
  itemsArray = Array(10);
  lectures!: any[];
  activeLecture: any;
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      let courseId!: any;
      let lectureId!: any;
      this.activatedRoute.queryParamMap.subscribe((params) => {
        courseId = params.get('courseId');
        lectureId = params.get('lectureId');
        this.courseService.getCourseById(courseId as string).subscribe({
          next: (result) => {
            console.log(result);
            this.courseInfo = result.data ?? result;
            this.ratings = this.courseInfo.course_rating.ratingPercentages;
            this.studentFeedbacks = this.courseInfo.students_feedbacks;
            this.lectures = this.courseInfo.lectures;
          },
        });
      });
      this.lectureService.getLectureData(courseId).subscribe({
        next: (result: Array<any>) => {
          // this.lectures = result.map((lecture) => lecture.id == +lectureId);
          this.activeLecture = result.filter(
            (lecture) => lecture.id == +lectureId
          );
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }

  goBack(): void {
    this.location.back();
  }
  goToLecture(lectureId: string) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      let courseId = params.get('courseId');
      this.router.navigate(['/student/lecture'], {
        queryParams: { courseId, lectureId: lectureId },
      });
    });
  }
}
