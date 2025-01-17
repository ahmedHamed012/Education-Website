import { Component } from '@angular/core';
import { AdminTableComponent } from '../../../Shared/admin-table/admin-table.component';

@Component({
  selector: 'app-instructors-console',
  standalone: true,
  imports: [AdminTableComponent],
  templateUrl: './instructors-console.component.html',
  styleUrl: './instructors-console.component.scss',
})
export class InstructorsConsoleComponent {
  public customers!: Array<any>;
  ngOnInit() {
    this.customers = [
      {
        id: 1000,
        name: 'James Butt',
        email: 'email@email.com',
        phone: '01206154949',
      },
      {
        id: 1001,
        name: 'James Butt',
        email: 'email@email.com',
        phone: '01206154949',
      },
      {
        id: 1002,
        name: 'James Butt',
        email: 'email@email.com',
        phone: '01206154949',
      },
      {
        id: 1003,
        name: 'James Butt',
        email: 'email@email.com',
        phone: '01206154949',
      },
    ];
  }
}
