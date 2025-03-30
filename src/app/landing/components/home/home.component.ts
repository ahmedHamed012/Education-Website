import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CoursesService } from '../../../Core/Services/courses.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('heroVideo', { static: false })
  heroVideo!: ElementRef<HTMLVideoElement>;
  public value!: string;
  public popularCourses!: any[];

  constructor(
    private readonly courseService: CoursesService,
    private readonly router: Router
  ) {}
  ngAfterViewInit() {
    const video = this.heroVideo.nativeElement;
    video.muted = true; // Ensure it's muted to comply with autoplay policies
    video.play().catch((error) => {
      console.error('Autoplay prevented:', error);
    });
    const text = 'Education without limits';
    let index = 0;
    const typingText = document.querySelector('.typing-text') as HTMLElement;

    const typeEffect = () => {
      if (index < text.length) {
        typingText.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeEffect, 100);
      }
    };

    setTimeout(typeEffect, 500);
  }
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
