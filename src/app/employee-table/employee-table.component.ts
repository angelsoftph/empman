import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { EmployeeView } from '../models/employee';
import { EmployeeService } from '../services/employee.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'employee-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css',
})
export class EmployeeTableComponent implements OnInit {
  employees: EmployeeView[] = [];
  categories: Category[] = [];
  showModal: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private employeeService: EmployeeService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.setTitle('Workers Pool');

    this.employeeService.getEmployees().subscribe((data: EmployeeView[]) => {
      this.employees = data;
    });

    this.categoryService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  showWorkers(event: Event): void {
    const categoryId = Number((event.target as HTMLSelectElement).value);

    if (categoryId) {
      this.employeeService
        .getEmployeesByCategoryId(categoryId)
        .subscribe((data: EmployeeView[]) => {
          this.employees = data;
        });
    } else {
      this.employeeService.getEmployees().subscribe((data: EmployeeView[]) => {
        this.employees = data;
      });
    }
  }

  addEmployee() {
    this.router.navigate(['/employees/create']);
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.employees = this.employees.filter((e) => e.id !== id);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  editEmployee(id: number) {
    this.router.navigate(['/employee/edit', id]);
  }

  confirmDelete(employeeId: number, firstName: string, lastName: string): void {
    Swal.fire({
      title: `Delete ${firstName} ${lastName}?`,
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#0d6efd',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteEmployee(employeeId);
        Swal.fire(
          'Deleted!',
          `${employeeId} has been successfully deleted.`,
          'success'
        );
      }
    });
  }
}
