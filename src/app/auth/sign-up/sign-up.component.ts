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
  selectedFile: File | null = null; // Store selected file

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Store the file separately
    }
  }

  register() {
    if (!this.signUpForm.valid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Registration Error',
        detail: 'There are missing fields',
      });
      return;
    }

    const registerData = this.signUpForm.value;

    if (registerData.password !== registerData.confirmPassword) {
      this.messageService.add({
        severity: 'error',
        summary: 'Incorrect Password',
        detail: "The password and the confirm password don't match",
      });
      return;
    }

    if (!registerData.agreement) {
      this.messageService.add({
        severity: 'warn',
        summary: 'License Acceptance Required',
        detail: 'You must agree to the terms & conditions',
      });
      return;
    }

    // Construct basicsData object
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

    // Construct studentData or instructorData based on role
    const newUserData: IUser =
      registerData.role === 'student'
        ? {
            ...basicsData,
            education: registerData.education,
            interests: registerData.interests,
          }
        : {
            ...basicsData,
            about: registerData.about || '',
            major: registerData.major,
            paypal_account: registerData.paypalAccount,
          };

    // Create FormData object
    const formData = new FormData();

    // Append fields to FormData
    Object.entries(newUserData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (typeof value === 'object') {
          formData.append(key, JSON.stringify(value)); // Convert objects to JSON strings
        } else {
          formData.append(key, value.toString());
        }
      }
    });

    // Append image file separately
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    // Send request
    this.authService.register(formData).subscribe({
      next: (result) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Registration Success',
          detail:
            'Successfully created your account. You will be redirected to the login page.',
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
            'An error occurred while creating your account. Try again later.',
        });
        console.error(err);
      },
    });
  }
}
