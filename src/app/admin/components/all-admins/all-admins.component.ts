import { Component } from '@angular/core';
import { AdminTableComponent } from '../../../Shared/admin-table/admin-table.component';

@Component({
  selector: 'app-all-admins',
  standalone: true,
  imports: [AdminTableComponent],
  templateUrl: './all-admins.component.html',
  styleUrl: './all-admins.component.scss'
})
export class AllAdminsComponent {
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
