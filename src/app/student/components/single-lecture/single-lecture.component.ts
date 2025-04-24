import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { DividerModule } from 'primeng/divider';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../../Core/Services/courses.service';
import { LectureService } from '../../../Core/Services/lecture.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { AuthenticationService } from '../../../Core/Services/authentication.service';
import { UtilsService } from '../../../Core/Services/utils.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-single-lecture',
  standalone: true,
  imports: [
    CommonModule,
    AvatarModule,
    AvatarGroupModule,
    DividerModule,
    ToastModule,
    DialogModule,
    FormsModule,
    RatingModule,
    ToastModule,
  ],
  templateUrl: './single-lecture.component.html',
  styleUrl: './single-lecture.component.scss',
})
export class SingleLectureComponent {
  constructor(
    private readonly router: Router,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private readonly courseService: CoursesService,
    private readonly authService: AuthenticationService,
    private readonly messageService: MessageService,
    private readonly lectureService: LectureService,
    private readonly utilsService: UtilsService,
    private readonly location: Location
  ) {}
  courseInfo!: any;
  ratings!: any;
  studentFeedbacks!: any[];
  itemsArray = Array(10);
  lectures!: any[];
  activeLecture: any;
  visible: boolean = false;
  rating: number = 0;
  comment: string = '';
  #studentId: string = '';
  #token: string = localStorage.getItem('learn_on_token')?.split('|')[1] ?? '';
  lectureVideo!: any;
  openDialog() {
    this.visible = true;
  }
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      let courseId!: any;
      let lectureId!: any;
      this.activatedRoute.queryParamMap.subscribe((params) => {
        courseId = params.get('courseId');
        lectureId = params.get('lectureId');
        this.courseService.getCourseById(courseId as string).subscribe({
          next: (result) => {
            this.courseInfo = result.data;
            this.ratings = this.courseInfo.course_rating.ratingPercentages;
            this.studentFeedbacks = this.courseInfo.students_feedbacks;
            this.lectures = this.courseInfo.lectures;
          },
        });
      });
      this.lectureService.getLectureData(courseId, lectureId).subscribe({
        next: (result) => {
          const lectureData = result.data;
          // this.lectures = result.map((lecture) => lecture.id == +lectureId);
          this.lectureService.lectureDataSnippet.next(lectureData);
        },
        error: (err) => {
          console.log(err);
        },
      });
      this.lectureService.lectureDataSnippet.subscribe((value) => {
        console.log(value);
        this.activeLecture = value[0];
        this.lectureVideo = this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://drive.google.com/file/d/15zJfaXQgEUJfvC_kP6kFbYX_G0Gw4qbd/preview`
        );
        console.log(this.lectureVideo);
      });
    });

    this.authService.getLoggedInUserData(this.#token).subscribe({
      next: (value) => {
        this.#studentId = value['user']['details'].id;
      },
      error: (err) => console.error(err),
    });
  }

  goBack(): void {
    this.location.back();
  }

  goToLecture(lectureId: string) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      let courseId = params.get('courseId');
      this.lectureService
        .getLectureData(courseId as string, lectureId)
        .subscribe({
          next: (result: any) => {
            // this.lectures = result.map((lecture) => lecture.id == +lectureId);
            this.lectureService.lectureDataSnippet.next(result.data);
          },
          error: (err) => {
            console.log(err);
          },
        });
      this.router.navigate(['/student/lecture'], {
        queryParams: { courseId, lectureId: lectureId },
      });
    });
  }

  submitReview() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      let courseId = params.get('courseId');

      this.courseService
        .submitFeedback(
          this.rating,
          this.comment,
          courseId as string,
          this.#studentId
        )
        .subscribe({
          next: (value) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Feedback submitted successfully',
            });
            this.comment = '';
            this.rating = 0;
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Something went wrong',
            });
          },
        });
    });
    this.visible = false;
  }
}
