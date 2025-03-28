import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../../Core/Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  public studentData: any;
  public courses: any;
  public statistics: any;
  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}
  ngOnInit() {
    this.userService.getStudentDashboard().subscribe({
      next: (result) => {
        this.studentData = result?.student;
        this.statistics = {
          enrolledCourses: result?.totalEnrolledCourses,
          activeCourses: result?.activeCourses,
          categories: result?.totalCategories,
        };
        this.courses = result?.recommendedCourses;
      },
      error: (err) => {},
    });
  }
  navigate(courseId: string) {
    const url = this.router
      .createUrlTree(['/student/course'], {
        queryParams: { courseId },
      })
      .toString();

    window.open(url, '_blank'); // Opens in a new tab
  }
  // courses = [
  //   {
  //     category: 'Reiki Level I, II and Master/Teacher Program',
  //     title: '1. Introductions',
  //     image: 'assets/Images/related_course_1.png',
  //   },
  //   {
  //     category: 'Reiki Level I, II and Master/Teacher Program',
  //     title: '1. Introductions',
  //     image: 'assets/Images/related_course_2.png',
  //   },
  //   {
  //     category: 'Copywriting - Become a Freelance Copywriter',
  //     title: '1. How to get started with Figma',
  //     image: 'assets/Images/related_course_3.png',
  //   },
  //   {
  //     category: 'Copywriting - Become a Freelance Copywriter',
  //     title: '1. How to get started with Figma',
  //     image: 'assets/Images/related_course_4.png',
  //   },
  // ];
}
