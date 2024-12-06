import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit {
  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    role: '',
  };

  errorMessage: string = '';
  isEditing: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((result) => {
      const id = result.get('id');
      if (id) {
        this.isEditing = true;

        this.userService.getUserById(Number(id)).subscribe({
          next: (result) => (this.user = result),
          error: (err) => (this.errorMessage = `Error: ${err.message}`),
        });
      }
    });
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.userService.updateUser(this.user).subscribe({
        next: () => {
          this.showAlert('User has been successfully updated.');
        },
        error: (err) => {
          this.errorMessage = `Error when updating: ${err.message}`;
        },
      });
    } else {
      this.authService.register(this.user).subscribe({
        next: () => {
          this.showAlert('User has been successfully created.');
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
      this.router.navigate(['/users']);
    });
  }
}
