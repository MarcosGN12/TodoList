import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../types/task';
import { Page } from '../types/page';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  loadTasks(page: number): Observable<Page<Task>> {
    return this.http.get<Page<Task>>(`http://localhost:3000/tasks?page=${page}`);
  }

  createTask(data: any) {
    return this.http.post('http://localhost:3000/tasks', data);
  }

  editTask(task: any) {
    return this.http.patch(`http://localhost:3000/tasks/${task.id}`, task);
  }

  deleteTask(task: any) {
    const taskId = task.id;
    return this.http.delete(`http://localhost:3000/tasks/${taskId}`);
  }
}
