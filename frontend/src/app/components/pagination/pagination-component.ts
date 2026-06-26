import { Component, input, output } from '@angular/core';

@Component({
  selector: 'pagination-component',
  templateUrl: './pagination-component.html',
  styleUrl: './pagination-component.css',
  standalone: true,
})
export class PaginationComponent {
  pageNumber = input<number>(1);
  totalPages = input<number>(1);

  pageChange = output<number>();

  previusPage() {
    const currentPage = Number(this.pageNumber());

    if (currentPage <= 1) return;
    this.pageChange.emit(currentPage - 1);
  }

  nextPage() {
    const currentPage = Number(this.pageNumber());
    const total = Number(this.totalPages());

    this.pageChange.emit(currentPage + 1);
  }
}
