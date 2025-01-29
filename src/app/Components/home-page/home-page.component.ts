import { Component } from '@angular/core';
import { NavbarComponent } from '../../Shared/navbar/navbar.component';
import { AdminTableComponent } from '../../Shared/admin-table/admin-table.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../Shared/footer/footer.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
