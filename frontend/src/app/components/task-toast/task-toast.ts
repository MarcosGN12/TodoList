import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'task-toast',
  templateUrl: './task-toast.html',
  styleUrl: './task-toast.css',
  standalone: true,
})
export class TaskToastComponent {
  description = input<string>('');
}
