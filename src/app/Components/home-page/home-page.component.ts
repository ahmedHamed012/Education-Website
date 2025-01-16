import { Component } from '@angular/core';
import { NavbarComponent } from '../../Shared/navbar/navbar.component';
import { AdminTableComponent } from '../../Shared/admin-table/admin-table.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavbarComponent, AdminTableComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
