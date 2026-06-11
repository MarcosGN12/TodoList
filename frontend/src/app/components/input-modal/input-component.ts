import { Component, Input } from '@angular/core';

@Component({
  selector: 'input-component',
  templateUrl: './input-component.html',
  styleUrl: './input-component.css',
})
export class InputComponent {
  @Input() title = '';
}
