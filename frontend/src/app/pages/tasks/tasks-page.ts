import { Component, signal } from '@angular/core';
import { InputComponent } from '../../components/input-modal/input-component';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { PaginationComponent } from '../../components/pagination/pagination-component';
import { Task } from '../../types/task';
import { BadgeComponent } from '../../components/badge/badge-component';
import { LucidePencil, LucideTrash } from '@lucide/angular';
import { EditComponent } from '../../components/edit-modal/edit-component';

@Component({
  selector: 'tasks-page',
  templateUrl: './tasks-page.html',
  standalone: true,
  imports: [
    InputComponent,
    EditComponent,
    FormsModule,
    PaginationComponent,
    BadgeComponent,
    LucideTrash,
  ],
})
export class TasksPage {
  constructor(private taskService: TasksService) {}

  taskForm = signal<Task>({
    id: 0,
    name: '',
    description: '',
    endDate: '',
    state: '',
  });

  tasks = signal<Task[]>([]);

  pageNumber = signal(1);

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.loadTasks(this.pageNumber()).subscribe((data) => {
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

  currentPage(page: number) {
    this.pageNumber.set(page);
    this.taskService.loadTasks(page).subscribe((data) => {
      this.tasks.set(data);
    });
  }
}
