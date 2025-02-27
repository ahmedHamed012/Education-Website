import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from '../../../Core/Services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarModule,
    MenuModule,
    ToastModule,
    AvatarModule,
    AvatarGroupModule,
    BadgeModule,
  ],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.scss',
})
export class AdminNavbarComponent {
  items: MenuItem[] | undefined;
  token = localStorage.getItem('learn_on_token');
  username!: string;
  firstName!: string;
  lastName!: string;
  role!: string;

  constructor(
    private readonly authService: AuthenticationService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Profile',
        items: [
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => {
              this.authService.logout().subscribe({
                next: (result) => {
                  localStorage.removeItem('learn_on_token');
                  localStorage.removeItem('learn_on_device_token');
                  this.router.navigate(['/auth/login']);
                },
              });
            },
          },
        ],
      },
      {
        separator: true,
      },
    ];
    this.authService
      .getLoggedInAdminData(this.token?.split('|')[1] as string)
      .subscribe({
        next: (result) => {
          this.username = result['user']['details'].name;
          this.firstName = this.username.split(' ')[0];
          this.lastName =
            this.username.split(' ')[this.username.split(' ').length - 1];
          this.role = result['user'].role;
        },
      });
  }
}
