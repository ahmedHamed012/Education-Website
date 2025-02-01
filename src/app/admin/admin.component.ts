import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { FooterComponent } from '../Shared/footer/footer.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AdminNavbarComponent, RouterModule, FooterComponent],
templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
