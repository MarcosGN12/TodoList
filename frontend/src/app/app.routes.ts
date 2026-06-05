import { Routes } from '@angular/router';
import { TasksPage } from './pages/tasks/tasks-page';

export const routes: Routes = [
  {
    path: '',
    component: TasksPage,
    canActivate: [],
  },
];
