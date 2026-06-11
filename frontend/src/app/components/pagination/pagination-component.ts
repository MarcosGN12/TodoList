import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'pagination-component',
  templateUrl: './pagination-component.html',
  styleUrl: './pagination-component.css',
  standalone: true,
})
export class PaginationComponent {
  pageNumber = input<number>(1);

  pageChange = output<number>();

  previusPage() {
    if (this.pageNumber() === 1) return;
    this.pageChange.emit(this.pageNumber() - 1);
  }

  nextPage() {
    this.pageChange.emit(this.pageNumber() + 1);
  }
}
