import { Component, Input, signal } from '@angular/core';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'switch-pages-component',
  templateUrl: './switch-pages-component.html',
  styleUrl: './switch-pages-component.css',
})
export class SwitchPagesComponent {
  constructor(private taskService: TasksService) {}
  taskForm = signal({
    name: '',
    description: '',
    endDate: '',
    state: '',
  });

  tasks = signal<any[]>([]);

  pageNumber = signal(1);

  currentPage(page: number) {
    this.pageNumber.set(page);
    this.taskService.loadTasks(page).subscribe((data) => {
      this.tasks.set(data);
    });
  }

  previusPage() {
    if (this.pageNumber() === 1) {
      return;
    }
    this.currentPage(this.pageNumber() - 1);
  }

  nextPage() {
    this.currentPage(this.pageNumber() + 1);
  }
}
