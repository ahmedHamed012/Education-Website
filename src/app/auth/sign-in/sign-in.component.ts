import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../Core/Services/authentication.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PasswordModule,
    CheckboxModule,
    DividerModule,
    RouterLink,
    ToastModule,
    DialogModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  public visible: boolean = false;
  public resetEmail: string = '';
  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthenticationService,
    private readonly messageService: MessageService,
    private readonly router: Router
  ) {}

  public loginForm: FormGroup = this.fb.group({
    email: [null, [Validators.required]],
    password: [null, [Validators.required]],
    rememberUser: [false, []],
  });

  login() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: (result) => {
        const token = result.token;
        const deviceToken = result.device_token;
        const userRole = result['user']['role'];

        localStorage.setItem('learn_on_token', token);
        localStorage.setItem('learn_on_device_token', deviceToken);

        setTimeout(() => {
          console.log(userRole);
          if (userRole === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/']);
          }
        }, 0);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: 'Login Failed. Ensure that your data is correct',
        });
        console.log(err);
      },
    });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  public forgetPassword() {
    this.authService.forgetPassword(this.resetEmail).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Done',
          detail: `${response?.message}`,
        });
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
