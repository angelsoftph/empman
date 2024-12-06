import { Category } from './category';

export interface Employee {
  id: number;
  userId: number;
  title: string;
  categoryId: number;
}

export interface EmployeeView {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  categoryId: number;
  categoryName: Category;
}
