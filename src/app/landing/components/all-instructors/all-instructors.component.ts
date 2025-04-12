import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InstructorService } from '../../../Core/Services/instructors.service';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { InstructorProfileComponent } from '../instructor-profile/instructor-profile.component';

@Component({
  selector: 'app-all-instructors',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ToastModule,
    FormsModule,
    InstructorProfileComponent,
  ],
  templateUrl: './all-instructors.component.html',
  styleUrl: './all-instructors.component.scss',
})
export class AllInstructorsComponent {
  constructor(
    private readonly router: Router,
    private readonly instructorService: InstructorService
  ) {}
  profiles: any[] = [
    {
      name: 'Mostafa Amaar',
      title: 'Computer Engineer',
      rating: 4,
      stars: Array(5).fill(0), // Array of 5 for stars
    },
  ];
  visible: boolean = false;
  selectedInstructor: any;
  ngOnInit() {
    this.instructorService.getAllInstructors().subscribe({
      next: (value) => {
        this.profiles = value.data;
        this.profiles.map((profile) => {
          profile.filledStars = Array(Math.floor(profile.rate)).fill(0);
          profile.emptyStars = Array(5 - Math.floor(profile.rate)).fill(0);
        });
      },
      error: (err) => {},
    });
  }
  viewProfile(instructorId: string) {
    this.instructorService.instructorDataSnippet.next(instructorId);
    this.visible = true;
  }
}
