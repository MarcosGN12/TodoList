import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'tableComponent',
  templateUrl: './table-component.html',
})
export class TableComponent<T> {
  @Input() data: T[] = [];
  @Input() columns: { key: keyof T; label: string }[] = [];

  @Input({ required: true }) title = '';
  @Input({ required: true }) shown: boolean = false;
  @Output() shownChange = new EventEmitter<boolean>();

  closeModal() {
    this.shown = false;
    this.shownChange.emit(this.shown);
  }
  dataStore = inject(TasksService<T>);
}
