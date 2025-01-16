import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
@Component({
  selector: 'app-admin-table',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './admin-table.component.html',
  styleUrl: './admin-table.component.scss',
})
export class AdminTableComponent {
  @Input() caption: string = '';
  @Input() buttonLabel: string = '';
  customers: any[] = [];
  ngOnInit() {
    this.customers = [
      {
        id: 1000,
        name: 'James Butt',
        country: {
          name: 'Algeria',
          code: 'dz',
        },
        company: 'Benton, John B Jr',
        date: '2015-09-13',
        status: 'unqualified',
        verified: true,
        activity: 17,
        representative: {
          name: 'Ioni Bowcher',
          image: 'ionibowcher.png',
        },
        balance: 70663,
      },
    ];
    console.log(this.customers);
  }
}
