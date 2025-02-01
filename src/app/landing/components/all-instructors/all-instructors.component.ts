import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-instructors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-instructors.component.html',
  styleUrl: './all-instructors.component.scss'
})
export class AllInstructorsComponent {
  profiles = [
    {
      name: 'Mostafa Amaar',
      title: 'Computer Engineer',
      rating: 4,
      stars: Array(5).fill(0), // Array of 5 for stars
    },
    {
      name: 'Mostafa Amaar',
      title: 'Computer Engineer',
      rating: 4,
      stars: Array(5).fill(0), // Array of 5 for stars
    },
    {
      name: 'Mostafa Amaar',
      title: 'Computer Engineer',
      rating: 4,
      stars: Array(5).fill(0), // Array of 5 for stars
    },
    {
      name: 'Mostafa Amaar',
      title: 'Computer Engineer',
      rating: 4,
      stars: Array(5).fill(0), // Array of 5 for stars
    },
    {
      name: 'Mostafa Amaar',
      title: 'Computer Engineer',
      rating: 4,
      stars: Array(5).fill(0), // Array of 5 for stars
    },
    {
      name: 'Mostafa Amaar',
      title: 'Computer Engineer',
      rating: 4,
      stars: Array(5).fill(0), // Array of 5 for stars
    },
    {
      name: 'Mostafa Amaar',
      title: 'Computer Engineer',
      rating: 4,
      stars: Array(5).fill(0), // Array of 5 for stars
    },
    {
      name: 'Mostafa Amaar',
      title: 'Computer Engineer',
      rating: 4,
      stars: Array(5).fill(0), // Array of 5 for stars
    },
    // Add more profiles as needed
  ];
}
