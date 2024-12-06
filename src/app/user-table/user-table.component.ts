import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';

import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'user-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
})
export class UserTableComponent implements OnInit {
  users: User[] = [];
  showModal: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.setTitle('Workers Pool');

    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  addUser() {
    this.router.navigate(['/users/create']);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter((e) => e.id !== id);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  editUser(id: number) {
    this.router.navigate(['/user/edit', id]);
  }

  confirmDelete(userId: number, firstName: string, lastName: string): void {
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
        this.deleteUser(userId);
        Swal.fire(
          'Deleted!',
          `${userId} has been successfully deleted.`,
          'success'
        );
      }
    });
  }
}
