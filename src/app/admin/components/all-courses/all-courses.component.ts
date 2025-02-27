import { Component } from '@angular/core';
import { AdminTableComponent } from '../../../Shared/admin-table/admin-table.component';

@Component({
  selector: 'app-all-courses',
  standalone: true,
  imports: [AdminTableComponent],
  templateUrl: './all-courses.component.html',
  styleUrl: './all-courses.component.scss'
})
export class AllCoursesComponent {

}
