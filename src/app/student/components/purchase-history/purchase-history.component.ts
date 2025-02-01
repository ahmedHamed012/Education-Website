import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-purchase-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './purchase-history.component.html',
  styleUrl: './purchase-history.component.scss'
})
export class PurchaseHistoryComponent {
  purchases = [
    {
      date: '1st September, 2021 at 11:30 PM',
      courses: 1,
      price: 75.0,
      paymentMethod: 'Credit Card',
    },
    {
      date: '31st August, 2021 at 11:30 PM',
      courses: 1,
      price: 507.0,
      paymentMethod: 'Credit Card',
    },
    {
      date: '24th August, 2021 at 6:34 PM',
      courses: 1,
      price: 9.0,
      paymentMethod: 'Credit Card',
    },
    {
      date: '1st September, 2021 at 8:47 PM',
      courses: 1,
      price: 25.0,
      paymentMethod: 'Credit Card',
    },
    {
      date: '1st September, 2021 at 11:30 PM',
      courses: 1,
      price: 89.0,
      paymentMethod: 'Credit Card',
    },
    {
      date: '17th July, 2021 at 10:51 AM',
      courses: 1,
      price: 140.0,
      paymentMethod: 'Credit Card',
    },
  ];
}
