import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'category-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-table.component.html',
  styleUrl: './category-table.component.css',
})
export class CategoryTableComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.setTitle('Category Management');

    this.categoryService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.categories = this.categories.filter((c) => c.id !== id);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addCategory() {
    this.router.navigate(['/categories/create']);
  }

  editCategory(id: number) {
    this.router.navigate(['/category/edit', id]);
  }

  confirmDelete(categoryId: number, categoryName: string): void {
    Swal.fire({
      title: `Delete ${categoryName}?`,
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#0d6efd',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteCategory(categoryId);
        Swal.fire(
          'Deleted!',
          `${categoryName} has been successfully deleted.`,
          'success'
        );
      }
    });
  }
}
