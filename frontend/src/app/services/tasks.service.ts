import { EventEmitter, Injectable, Input, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TasksService<T> {
  @Input() data: T[] = [];
  @Input() columns: { key: keyof T; label: string }[] = [];

  @Input({ required: true }) title = '';
  @Input({ required: true }) shown: boolean = false;
  @Output() shownChange = new EventEmitter<boolean>();

  closeModal() {
    this.shown = false;
    this.shownChange.emit(this.shown);
  }
}
