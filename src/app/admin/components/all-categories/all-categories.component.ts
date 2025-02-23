import { Component } from '@angular/core';
import { AdminTableComponent } from '../../../Shared/admin-table/admin-table.component';
import { CommonModule } from '@angular/common';
import { CategoryService } from './../../services/category.service';

@Component({
  selector: 'app-all-categories',
  standalone: true,
  imports: [AdminTableComponent, CommonModule],
  templateUrl: './all-categories.component.html',
  styleUrl: './all-categories.component.scss',
  template: `
    <app-admin-table
      [caption]="'All Categories'"
      [buttonLabel]="'Add New Category'"
      [dataHeaders]="dataHeaders"
      [dataList]="categories"
      [actionVisibility]="true"
    ></app-admin-table>
  `,
})

export class AllCategoriesComponent {
  categories: any[] = [];
  dataHeaders: string[] = ['id', 'name', 'description']; 

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories(): void {
    console.log(localStorage.getItem('token'));

    this.categoryService.getCategories().subscribe(
      (response) => {
        console.log('API Response:', response);
        if (response && response.data) {
          this.categories = [...response.data]; 
        } else {
          console.error('Unexpected API response format:', response);
        }
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
}