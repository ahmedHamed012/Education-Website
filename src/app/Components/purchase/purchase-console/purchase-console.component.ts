import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-purchase-console',
  standalone: true,
  imports: [TableModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './purchase-console.component.html',
  styleUrl: './purchase-console.component.scss',
})
export class PurchaseConsoleComponent {
  itemsList: any[] = [];
  itemsHeaders: any[] = [];
  ngOnInit() {
    this.itemsList = [
      {
        id: 1000,
        studentName: 'James Butt',
        instructorName: 'James Butt',
        course: 'Web Development',
        amountPaid: '20$',
        paymentMethod: 'visa',
      },
      {
        id: 1001,
        studentName: 'James Butt',
        instructorName: 'James Butt',
        course: 'Web Development',
        amountPaid: '20$',
        paymentMethod: 'paypal',
      },
      {
        id: 1002,
        studentName: 'James Butt',
        instructorName: 'James Butt',
        course: 'Web Development',
        amountPaid: '20$',
        paymentMethod: 'master',
      },
      {
        id: 1003,
        studentName: 'James Butt',
        instructorName: 'James Butt',
        course: 'Web Development',
        amountPaid: '20$',
        paymentMethod: 'visa',
      },
    ];
  }
}
