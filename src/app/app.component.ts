import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Employee Management System';
  isLoggedIn: boolean = false;
  userInfo: any;
  loggedInUser = '';

  constructor(private authService: AuthService) {
    this.authService = authService;
  }

  ngOnInit(): void {
    this.authService.token$.subscribe(() => {
      this.userInfo = this.authService.getUserInfo();
      if (this.userInfo) {
        this.loggedInUser =
          this.userInfo[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
          ];
      }
    });
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  onLogout(): void {
    this.authService.logout();
  }
}
