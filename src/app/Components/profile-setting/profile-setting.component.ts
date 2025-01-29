import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';
import { NavbarComponent } from '../../Shared/navbar/navbar.component';
import { FooterComponent } from '../../Shared/footer/footer.component';

@Component({
  selector: 'app-profile-setting',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PasswordModule,
    CheckboxModule,
    DividerModule,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './profile-setting.component.html',
  styleUrl: './profile-setting.component.scss',
})
export class ProfileSettingComponent {}
