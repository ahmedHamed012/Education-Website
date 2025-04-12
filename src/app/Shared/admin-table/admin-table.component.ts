import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() itemsHeaders: Array<any> = [];
  @Input() itemsList: Array<any> = [];
  @Input() actionVisibility: boolean = false;
  @Input() buttonLabel!: string;

  @Output() buttonClick = new EventEmitter<void>();

  ngOnInit() {
    this.itemsList = this.itemsList;
    this.itemsHeaders = this.itemsHeaders;
  }
  onButtonClick(): void {
    this.buttonClick.emit();  
  }
}
