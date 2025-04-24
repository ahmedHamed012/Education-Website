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
import { UtilsService } from '../../../Core/Services/utils.service';
import { DropdownModule } from 'primeng/dropdown';

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
    DropdownModule,
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
  countries: any[] | undefined;
  majors: any[] | undefined;
  public generalInfoTab: boolean = true;
  public securityInfoTab: boolean = false;
  constructor(
    private readonly authService: AuthenticationService,
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly messageService: MessageService,
    private readonly utilsService: UtilsService
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
  selectedFile: File | null = null; // Store selected file
  avatar!: any;

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.avatar = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Store the file separately
    }
  }

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }
  ngOnInit() {
    this.countries = [
      'Egypt',
      'Saudi Arabia',
      'United Arab Emirates',
      'Kuwait',
      'Qatar',
      'Oman',
      'Bahrain',
      'Iraq',
      'Jordan',
      'Lebanon',
      'Syria',
      'Yemen',
      'Sudan',
      'Libya',
      'Morocco',
      'Tunisia',
      'Algeria',
      'Mauritania',
    ];
    this.majors = ['university', 'school', 'graduated'];
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
        this.avatar = this.utilsService.fixAssetUrl(userData.image);
        this.firstName = userData.first_name;
        this.lastName = userData.last_name;
        this.username = userData.username;
        this.role = result['user'].role;
        this.userId = result['user'].id;
        this.email = result['user'].email;
        this.username = this.firstName + ' ' + this.lastName;
        this.authService.userDataSnippet.next({
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
    this.authService.userDataSnippet.subscribe((value) =>
      this.userProfileForm.patchValue(value)
    );
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

    this.userService
      .updateUserProfile(formData, this.userId as string)
      .subscribe({
        next: (response) => {
          const result = response.data;
          this.messageService.add({
            severity: 'success',
            summary: 'Operation Success',
            detail: 'Your Profile Updated Successfully',
          });
          this.firstName = result.first_name;
          this.lastName = result.last_name;
          this.username = `${result.first_name} ${result.last_name}`;
          this.email = result['user'].email;
          this.authService.userDataSnippet.next({
            firstName: this.firstName,
            lastName: this.lastName,
            userName: this.username,
            email: this.email,
            image: this.avatar,
            dateOfBirth: result.date_of_birth,
            gender: result.gender,
            country: result.country,
            phone: result.phone,
            education: result.education ?? 'N/A',
            about: result.about ?? 'N/A',
            major: result.major ?? 'N/A',
            interests: result.interests ?? 'N/A',
            paypalAccount: result.paypal_account ?? 'N/A',
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
          this.passwordChangeForm.reset();
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
