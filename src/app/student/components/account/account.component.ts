import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';
import { AuthenticationService } from '../../../Core/Services/authentication.service';
import { StepsModule } from 'primeng/steps';
import { MenuItem, MessageService } from 'primeng/api';
import { IUser } from '../../../Core/Interfaces/create-user.interface';
import { UserService } from '../../../Core/Services/user.service';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule,
    DividerModule,
    PasswordModule,
    StepsModule,
    ToastModule,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  public token = localStorage.getItem('learn_on_token');
  username!: string;
  firstName!: string;
  lastName!: string;
  role!: string;
  email!: string;
  items: MenuItem[] | undefined;
  userId!: string;
  public generalInfoTab: boolean = true;
  public securityInfoTab: boolean = false;
  constructor(
    private readonly authService: AuthenticationService,
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly messageService: MessageService
  ) {}

  public userProfileForm: FormGroup = this.fb.group({
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    userName: [null, [Validators.required]],
    email: [null, [Validators.required]],
    dateOfBirth: [null, [Validators.required]],
    gender: [null, [Validators.required]],
    country: [null, [Validators.required]],
    phone: [null, [Validators.required]],
    education: [null, []],
    about: [null, []],
    major: [null, []],
    image: ['assets/Images/person_1.jpeg'],
    interests: [null, []],
    paypalAccount: [null, [Validators.email]],
  });

  public passwordChangeForm: FormGroup = this.fb.group({
    currentPassword: [null, []],
    newPassword: [null, []],
    confirmPassword: [null, []],
  });

  activeIndex: number = 0;
  profileImage: any = null; // Holds the selected image URL

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.userProfileForm.patchValue({ image: e.target?.result });
      };
      reader.readAsDataURL(file);
    }
  }

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }
  ngOnInit() {
    this.items = [
      {
        label: 'Basic Information',
        command: (event: any) => {
          this.generalInfoTab = true;
          this.securityInfoTab = false;
        },
      },
      {
        label: 'Security',
        command: (event: any) => {
          this.generalInfoTab = false;
          this.securityInfoTab = true;
        },
      },
    ];

    this.authService.getLoggedInUserData(this.token as string).subscribe({
      next: (result) => {
        const userData = result['user']['details'];
        this.firstName = userData.first_name;
        this.lastName = userData.last_name;
        this.username = userData.username;
        this.role = result['user'].role;
        this.userId = result['user'].id;
        this.email = result['user'].email;
        this.username = this.firstName + ' ' + this.lastName;
        this.userProfileForm.patchValue({
          firstName: this.firstName,
          lastName: this.lastName,
          userName: this.username,
          email: this.email,
          dateOfBirth: userData.date_of_birth,
          gender: userData.gender,
          country: userData.country,
          phone: userData.phone,
          education: userData.education ?? 'N/A',
          about: userData.about ?? 'N/A',
          major: userData.major ?? 'N/A',
          interests: userData.interests ?? 'N/A',
          paypalAccount: userData.paypal_account ?? 'N/A',
        });
      },
    });
  }

  updateUserProfileData() {
    const registerData = this.userProfileForm.value;
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
      this.role == 'student' ? studentData : instructorData;

    this.userService
      .updateUserProfile(newUserData, this.userId as string)
      .subscribe({
        next: (result) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Operation Success',
            detail: 'Your Profile Updated Successfully',
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Operation Failed',
            detail: 'There is a problem in the profile update operation',
          });
        },
      });
  }

  updateProfilePassword() {
    const currentPassword =
      this.passwordChangeForm.get('currentPassword')?.value;
    const newPassword = this.passwordChangeForm.get('newPassword')?.value;
    const confirmPassword =
      this.passwordChangeForm.get('confirmPassword')?.value;
    this.authService
      .updateUserPassword(currentPassword, newPassword, confirmPassword)
      .subscribe({
        next: (result) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Operation Success',
            detail: 'Your Password Updated Successfully',
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Operation Failed',
            detail:
              'There is a problem in the profile update password operation',
          });
        },
      });
  }
}
