import { Component, signal } from '@angular/core';
import { ModalComponent } from '../../components/input-modal/modal-component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'tasks-page',
  templateUrl: './tasks-page.html',
  standalone: true,
  imports: [ModalComponent, FormsModule],
})
export class TasksPage {
  constructor(private http: HttpClient) {}

  taskForm = signal({
    name: '',
    description: '',
    endDate: '',
    state: '',
  });

  tasks = signal<any[]>([]);

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.http.get<any[]>('http://localhost:3000/tasks').subscribe((data) => {
      this.tasks.set(data);
    });
  }

  onSubmit() {
    this.http.post('http://localhost:3000/tasks', this.taskForm()).subscribe(() => {
      this.loadTasks();
    });
  }

  editTask(task: any) {
    this.http.patch(`http://localhost:3000/tasks/${task.id}`, task).subscribe(() => {
      this.loadTasks();
    });
  }

  deleteTask(task: any) {
    const taskId = task.id;

    this.http.delete(`http://localhost:3000/tasks/${taskId}`).subscribe(() => {
      this.loadTasks();
    });
  }
}
