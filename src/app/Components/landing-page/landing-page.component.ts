import { Component } from '@angular/core';
import { NavbarComponent } from '../../Shared/navbar/navbar.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../../Shared/footer/footer.component';
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    NavbarComponent,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    FooterComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  public value!: string;
}
