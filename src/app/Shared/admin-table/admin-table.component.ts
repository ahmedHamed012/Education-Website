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
  @Input() dataHeaders: Array<any> = [];
  @Input() dataList: Array<any> = [];
  @Input() actionVisibility: boolean = false;
  @Input() buttonLabel: string = '';
  itemsList: any[] = [];
  itemsHeaders: any[] = [];
  ngOnInit() {
    this.itemsList = this.dataList;
    this.itemsHeaders = this.dataHeaders;
  }
}
