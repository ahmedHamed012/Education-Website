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
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthenticationService } from '../../../Core/Services/authentication.service';
import { UtilsService } from '../../../Core/Services/utils.service';

@Component({
  selector: 'app-landing-navbar',
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
  templateUrl: './landing-navbar.component.html',
  styleUrl: './landing-navbar.component.scss',
})
export class LandingNavbarComponent {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthenticationService,
    private readonly utilsService: UtilsService
  ) {}
  items: MenuItem[] | undefined;
  avatar!: string;
  token = localStorage.getItem('learn_on_token');
  username!: string;
  firstName!: string;
  lastName!: string;
  role!: string;
  ngOnInit() {
    this.items = [
      {
        label: 'Profile',
        items: [
          {
            label: 'Settings',
            icon: 'pi pi-cog',
            command: () => {
              this.router.navigate(['/student/account']);
            },
          },
          {
            label: 'Dashboard',
            icon: 'pi pi-chart-bar',
            command: () => {
              this.router.navigate(['/student/dashboard']);
            },
          },
          {
            label: 'Purchase History',
            icon: 'pi pi-wallet',
            command: () => {
              this.router.navigate(['/student/purchase-history']);
            },
          },
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
    if (this.token) {
      this.authService
        .getLoggedInUserData(this.token?.split('|')[1] as string)
        .subscribe({
          next: (result) => {
            this.firstName = result['user']['details'].first_name;
            this.lastName = result['user']['details'].last_name;
            this.username = result['user']['details'].username;
            this.avatar = this.utilsService.fixAssetUrl(
              result['user']['details'].image
            );
            this.role = result['user'].role;
            this.username = this.firstName + ' ' + this.lastName;
          },
        });
      this.authService.userDataSnippet.subscribe((response) => {
        console.log(response);
        this.firstName = response.firstName ?? this.firstName;
        this.lastName = response.lastName ?? this.lastName;
        this.username =
          response.firstName && response.lastName
            ? `${response.firstName} ${response.lastName}`
            : `${this.firstName} ${this.lastName}`;
        this.role = response.role;
        this.avatar = response.image ?? this.avatar;
      });
    }
  }
}
