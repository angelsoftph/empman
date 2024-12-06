import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  email = '';
  password = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (token: string) => {
        console.log('token', token);
        if (token) {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error) => {
        console.error('Login failed', error);
      },
    });
  }
}
