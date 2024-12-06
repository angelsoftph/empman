import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  userInfo: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo();
  }
}
