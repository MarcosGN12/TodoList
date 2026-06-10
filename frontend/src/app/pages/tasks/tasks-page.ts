import { Component, signal } from '@angular/core';
import { ModalComponent } from '../../components/input-modal/modal-component';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { SwitchPagesComponent } from '../../components/switch-pages/switch-pages-component';

@Component({
  selector: 'tasks-page',
  templateUrl: './tasks-page.html',
  standalone: true,
  imports: [ModalComponent, FormsModule, SwitchPagesComponent],
})
export class TasksPage {
  constructor(private taskService: TasksService) {}

  taskForm = signal({
    name: '',
    description: '',
    endDate: '',
    state: '',
  });

  tasks = signal<any[]>([]);

  pageNumber = signal(1);

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.loadTasks(0).subscribe((data) => {
      this.tasks.set(data);
    });
  }

  onSubmit() {
    this.taskService.createTask(this.taskForm()).subscribe(() => {
      this.loadTasks();
    });
  }

  editTask(task: any) {
    this.taskService.editTask(task).subscribe(() => {
      this.loadTasks();
    });
  }

  deleteTask(task: any) {
    this.taskService.deleteTask(task).subscribe(() => {
      this.loadTasks();
    });
  }
}
