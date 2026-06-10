import { EventEmitter, Injectable, Input, Output, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  loadTasks(page: number) {
    return this.http.get<any[]>(`http://localhost:3000/tasks?page=${page}`);
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
