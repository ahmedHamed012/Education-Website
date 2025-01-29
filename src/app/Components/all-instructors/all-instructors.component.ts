import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../Shared/navbar/navbar.component';
import { FooterComponent } from '../../Shared/footer/footer.component';

@Component({
  selector: 'app-all-instructors',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './all-instructors.component.html',
  styleUrl: './all-instructors.component.scss',
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
