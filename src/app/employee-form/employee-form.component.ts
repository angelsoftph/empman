import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { Employee, EmployeeView } from '../models/employee';
import { EmployeeService } from '../services/employee.service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
})
export class EmployeeFormComponent implements OnInit {
  category: Category = {
    id: 0,
    name: '',
    parentId: 0,
  };
  employee: Employee = {
    id: 0,
    userId: 0,
    title: '',
    categoryId: 0,
  };
  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    role: 'W',
  };
  categories: Category[] = [];
  users: User[] = [];
  errorMessage: string = '';
  isEditing: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private employeeService: EmployeeService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((result) => {
      this.categoryService.getCategories().subscribe({
        next: (result) => (this.categories = result),
        error: (err) => (this.errorMessage = `Error: ${err.message}`),
      });

      this.userService.getUsers().subscribe({
        next: (result) => (this.users = result),
        error: (err) => (this.errorMessage = `Error: ${err.message}`),
      });

      const id = result.get('id');
      if (id) {
        this.isEditing = true;

        this.employeeService.getEmployeeById(Number(id)).subscribe({
          next: (result) => (this.employee = result),
          error: (err) => (this.errorMessage = `Error: ${err.message}`),
        });
      }
    });
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.employeeService.updateEmployee(this.employee).subscribe({
        next: () => {
          this.showAlert('Employee has been successfully updated.');
        },
        error: (err) => {
          this.errorMessage = `Error when updating: ${err.message}`;
        },
      });
    } else {
      this.employeeService.createEmployee(this.employee).subscribe({
        next: () => {
          this.showAlert('Employee has been successfully created.');
        },
        error: (err) => {
          this.errorMessage = `Error when creating: ${err.message}`;
        },
      });
    }
  }

  showAlert(title: string): void {
    Swal.fire({
      title: `Confirmation`,
      text: title,
      icon: 'info',
      confirmButtonColor: '#28a745',
      confirmButtonText: 'OK',
    }).then(() => {
      this.router.navigate(['/employees']);
    });
  }
}
