import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { AuthenticationService } from '../../Core/Services/authentication.service';
import { StepsModule } from 'primeng/steps';
import { ChipModule } from 'primeng/chip';
import { IUser } from '../../Core/Interfaces/create-user.interface';
@Component({
  selector: 'app-sign-up',
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
    StepsModule,
    ChipModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthenticationService,
    private readonly router: Router,
    private readonly messageService: MessageService
  ) {}
  items: MenuItem[] | undefined;
  public generalInfoTab: boolean = true;
  public personalInfoTab: boolean = false;
  public signUpForm: FormGroup = this.fb.group({
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    userName: [null, [Validators.required]],
    email: [null, [Validators.required]],
    role: [null, [Validators.required]],
    password: [null, [Validators.required]],
    confirmPassword: [null, [Validators.required]],
    agreement: [false, [Validators.required]],
    dateOfBirth: [null, [Validators.required]],
    gender: [null, [Validators.required]],
    country: [null, [Validators.required]],
    phone: [null, [Validators.required]],
    education: [null, []],
    about: [null, []],
    major: [null, []],
    image: [null],
    interests: [null, []],
    paypalAccount: [null, [Validators.email]],
  });
  activeIndex: number = 0;
  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }
  ngOnInit() {
    this.items = [
      {
        label: 'Basic Information',
        command: (event: any) => {
          this.generalInfoTab = true;
          this.personalInfoTab = false;
        },
      },
      {
        label: 'Personal',
        command: (event: any) => {
          this.generalInfoTab = false;
          this.personalInfoTab = true;
        },
      },
    ];
  }
  register() {
    const registerData = this.signUpForm.value;

    const basicsData = {
      first_name: registerData.firstName,
      last_name: registerData.lastName,
      email: registerData.email,
      role: registerData.role,
      password: registerData.password,
      password_confirmation: registerData.confirmPassword,
      username: registerData.userName,
      gender: registerData.gender,
      date_of_birth: registerData.dateOfBirth,
      phone: registerData.phone,
      country: registerData.country,
    };

    const studentData: IUser = {
      ...basicsData,
      education: registerData.education,
      interests: registerData.interests,
    };

    const instructorData: IUser = {
      ...basicsData,
      about: registerData.about || '',
      major: registerData.major,
      paypal_account: registerData.paypalAccount,
    };

    const newUserData: IUser =
      this.signUpForm.get('role')?.value == 'student'
        ? studentData
        : instructorData;

    if (!this.signUpForm.valid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Registration Error',
        detail: 'There are missing fields',
      });
    }

    if (registerData.password !== registerData.confirmPassword) {
      this.messageService.add({
        severity: 'error',
        summary: 'Incorrect Password',
        detail: "The password and the confirm password doesn't match",
      });
    }

    if (!registerData.agreement) {
      this.messageService.add({
        severity: 'warn',
        summary: 'License Acceptance Required',
        detail: 'You must agree the terms & conditions',
      });
    }

    this.authService.register(newUserData).subscribe({
      next: (result) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Registration Success',
          detail:
            'Successfully Creating your account, you will be redirected to login page',
        });
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 3000);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Registration Failed',
          detail:
            'An error occurs while creating your account. Try again later',
        });
        console.error(err);
      },
    });
  }
}
