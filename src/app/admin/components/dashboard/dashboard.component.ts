import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../Core/Services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(private readonly userService: UserService) {}
  ngOnInit() {
    this.userService.getStudentDashboard().subscribe({
      next: (result) => {
        console.log(result);
      },
      error: (err) => {},
    });
  }
}
