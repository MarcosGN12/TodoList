import { Component, signal } from '@angular/core';
import { InputComponent } from '../../components/input-modal/input-component';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { PaginationComponent } from '../../components/pagination/pagination-component';
import { Task } from '../../types/task';
import { BadgeComponent } from '../../components/badge/badge-component';
import { LucideTrash } from '@lucide/angular';
import { EditComponent } from '../../components/edit-modal/edit-component';
import { TaskToastComponent } from '../../components/task-toast/task-toast';
import { Page } from '../../types/page';

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
    TaskToastComponent,
  ],
})
export class TasksPage {
  constructor(private taskService: TasksService) {}

  taskStateList: string[] = ['pending', 'working on', 'completed'];

  taskForm = signal<Task>({
    id: 0,
    name: '',
    description: '',
    endDate: '',
    state: this.taskStateList[0],
  });

  taskPage = signal<Page<Task>>({
    data: [],
    currentPage: 1,
    totalPages: 1,
  });

  deleteAlert = signal(false);
  editAlert = signal(false);

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.loadTasks(this.taskPage().currentPage).subscribe((page: Page<Task>) => {
      const cleanedTasks = page.data.map((task) => ({
        ...task,
        endDate: task.endDate.toString().split('T')[0],
      }));
      this.taskPage.set({
        ...page,
        data: cleanedTasks,
      });
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

      this.editAlert.set(true);

      setTimeout(() => {
        this.editAlert.set(false);
      }, 3000);
    });
  }

  deleteTask(task: any) {
    this.taskService.deleteTask(task).subscribe(() => {
      this.loadTasks();

      this.deleteAlert.set(true);

      setTimeout(() => {
        this.deleteAlert.set(false);
      }, 3000);
    });
  }

  currentPage(page: number) {
    this.taskPage.update((current) => ({ ...current, currentPage: page }));
    this.loadTasks();
  }
}
