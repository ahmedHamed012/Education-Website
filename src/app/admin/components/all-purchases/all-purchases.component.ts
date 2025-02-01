import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-all-purchases',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TableModule],
  templateUrl: './all-purchases.component.html',
  styleUrl: './all-purchases.component.scss'
})
export class AllPurchasesComponent {
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
