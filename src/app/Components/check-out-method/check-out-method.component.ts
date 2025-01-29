import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { NavbarComponent } from '../../Shared/navbar/navbar.component';
import { FooterComponent } from '../../Shared/footer/footer.component';

@Component({
  selector: 'app-check-out-method',
  standalone: true,
  imports: [CheckboxModule, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './check-out-method.component.html',
  styleUrl: './check-out-method.component.scss',
})
export class CheckOutMethodComponent {}
