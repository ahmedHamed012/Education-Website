import { Component } from '@angular/core';
import { AdminTableComponent } from '../../../Shared/admin-table/admin-table.component';

@Component({
  selector: 'app-all-students',
  standalone: true,
  imports: [AdminTableComponent],
  templateUrl: './all-students.component.html',
  styleUrl: './all-students.component.scss'
})
export class AllStudentsComponent {
  public students!: Array<any>;
  ngOnInit() {
    this.students = [
      {
        id: 1000,
        name: 'James Butt',
        email: 'email@email.com',
        education: 'College of Engineering',
      },
      {
        id: 1001,
        name: 'James Butt',
        email: 'email@email.com',
        education: 'College of Engineering',
      },
      {
        id: 1002,
        name: 'James Butt',
        email: 'email@email.com',
        education: 'College of Engineering',
      },
      {
        id: 1003,
        name: 'James Butt',
        email: 'email@email.com',
        education: 'College of Engineering',
      },
    ];
  }
}
