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
import { Router, RouterLink, RouterModule } from '@angular/router';
@Component({
  selector: 'app-navbar',
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
    RouterLink,
    RouterModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private readonly router: Router) {}
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Profile',
        items: [
          {
            label: 'Settings',
            icon: 'pi pi-cog',
            shortcut: '⌘+O',
            command: () => {
              this.router.navigate(['/home/profile-setting']);
            },
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => {
              this.router.navigate(['/auth/login']);
            },
          },
        ],
      },
      {
        separator: true,
      },
    ];
  }
}
