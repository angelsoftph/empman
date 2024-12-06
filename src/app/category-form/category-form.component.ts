import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'category-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css',
})
export class CategoryFormComponent implements OnInit {
  category: Category = {
    id: 0,
    name: '',
    parentId: 0,
  };

  categories: Category[] = [];

  errorMessage: string = '';
  isEditing: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((result) => {
      this.categoryService.getCategories().subscribe({
        next: (result) => (this.categories = result),
        error: (err) => (this.errorMessage = `Error: ${err.message}`),
      });

      const id = result.get('id');
      if (id) {
        this.isEditing = true;

        this.categoryService.getCategoryById(Number(id)).subscribe({
          next: (result) => (this.category = result),
          error: (err) => (this.errorMessage = `Error: ${err.message}`),
        });
      }
    });
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.categoryService.updateCategory(this.category).subscribe({
        next: () => {
          this.showAlert('Category has been successfully updated.');
        },
        error: (err) => {
          this.errorMessage = `Error when updating: ${err.message}`;
        },
      });
    } else {
      this.categoryService.createCategory(this.category).subscribe({
        next: () => {
          this.showAlert('Category has been successfully created.');
        },
        error: (err) => {
          this.errorMessage = `Error when creating: ${err.message}`;
        },
      });
    }
  }

  closeForm() {
    this.router.navigate(['/categories']);
  }

  showAlert(title: string): void {
    Swal.fire({
      title: `Confirmation`,
      text: title,
      icon: 'info',
      confirmButtonColor: '#28a745',
      confirmButtonText: 'OK',
    }).then(() => {
      this.router.navigate(['/categories']);
    });
  }
}
