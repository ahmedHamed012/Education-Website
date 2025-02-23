import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InstructorService } from '../../../Core/Services/instructors.service';

@Component({
  selector: 'app-all-instructors',
  standalone: true,
  imports: [CommonModule],
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
  ngOnInit() {
    this.instructorService.getAllInstructors().subscribe({
      next: (value) => {
        this.profiles = value.data;
        this.profiles.map((profile) => {
          profile.filledStars = Array(+profile.rate).fill(0);
          profile.emptyStars = Array(5 - +profile.rate).fill(0);
        });
      },
      error: (err) => {},
    });
  }
}
