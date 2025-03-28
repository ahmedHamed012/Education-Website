import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { AuthenticationService } from '../../Core/Services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  token: string | null = null;
  email: string | null = null;

  constructor(
    private readonly authService: AuthenticationService,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly messageService: MessageService
  ) {}
  ngOnInit() {
    // Retrieve the URL parameter (token)
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.token = params.get('token'); // 'token' matches the parameter in the route definition
      console.log('Token:', this.token);
    });

    // Retrieve the query parameter (email)
    this.activatedRoute.queryParamMap.subscribe((queryParams) => {
      this.email = queryParams.get('email');
      console.log('Email:', this.email);
    });
  }
  public resetPasswordForm: FormGroup = this.fb.group({
    newPassword: [null, [Validators.required]],
    confirmPassword: [null, [Validators.required]],
  });
  public resetPassword() {
    const payload: {
      email: string;
      token: string;
      password: string;
      password_confirmation: string;
    } = {
      email: this.email as string,
      token: this.token as string,
      password: this.resetPasswordForm.get('newPassword')?.value as string,
      password_confirmation: this.resetPasswordForm.get('confirmPassword')
        ?.value as string,
    };
    this.authService.resetPassword(payload).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Done',
          detail: `${response?.message}`,
        });
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed',
          detail: `${err?.error.message}`,
        });
      },
    });
  }
}
