import { Component, OnInit } from '@angular/core';
import { Category } from '../../../shared/models/category';
import { DeleteService } from '../../services/category/delete/delete.service';
import { GetAllService } from '../../services/category/getAll/getAll.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  categoryList: Category[] = [];

  constructor(
    private getAllService: GetAllService,
    private deleteService: DeleteService
  ){ }

  ngOnInit(): void {
    this.getAllService.getAll().subscribe((data) => {
      this.categoryList = data;
    })
  }

  getCategories(): void {
    this.getAllService.getAll().subscribe((data) => {
      this.categoryList = data;
    })
  }

  deleteCategory(id: number): void {
    this.deleteService.delete(id).subscribe(() => {
      this.getCategories();
    })
  }
}
