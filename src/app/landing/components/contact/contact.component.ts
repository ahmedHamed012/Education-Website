import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UtilsService } from '../../../Core/Services/utils.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  constructor(
    private readonly fb: FormBuilder,
    private readonly utilsService: UtilsService,
    private readonly messageService: MessageService
  ) {}
  public contactForm: FormGroup = this.fb.group({
    name: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    subject: [null, [Validators.required]],
    message: [null, [Validators.required]],
  });

  sendMessageToSupport() {
    const contactData = this.contactForm.value;
    this.utilsService.sendContactUsMessage(contactData).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success Operation',
          detail: `${response.message}`,
        });
        this.contactForm.reset();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed Operation',
          detail: `${err.message}`,
        });
      },
    });
  }
}
