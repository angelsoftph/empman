import { Routes } from '@angular/router';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthGuard } from './auth.guard';
import { LogoutComponent } from './logout/logout.component';
import { CategoryTableComponent } from './category-table/category-table.component';
import { UserTableComponent } from './user-table/user-table.component';
import { UserFormComponent } from './user-form/user-form.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginFormComponent },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'dashboard', redirectTo: '', pathMatch: 'full' },
  {
    path: 'employees',
    component: EmployeeTableComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employees/create',
    component: EmployeeFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employee/edit/:id',
    component: EmployeeFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'categories',
    component: CategoryTableComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'categories/create',
    component: CategoryFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'category/edit/:id',
    component: CategoryFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component: UserTableComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users/create',
    component: UserFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user/edit/:id',
    component: UserFormComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'login' },
];
