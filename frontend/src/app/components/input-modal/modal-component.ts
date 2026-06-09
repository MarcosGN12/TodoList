import { Component, Input } from '@angular/core';

@Component({
  selector: 'modal-component',
  templateUrl: './modal-component.html',
  styleUrl: './modal-component.css',
})
export class ModalComponent {
  @Input() title = '';
}
