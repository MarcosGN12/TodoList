import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'badge-component',
  templateUrl: './badge-component.html',
  styleUrl: './badge-component.css',
  standalone: true,
})
export class BadgeComponent {
  text = input<string>('Pending');
  type = input<'primary' | 'secondary' | 'success' | 'warning' | 'error'>('primary');

  badgeClass = computed(() => {
    return `badge badge-${this.type()}`;
  });
}
