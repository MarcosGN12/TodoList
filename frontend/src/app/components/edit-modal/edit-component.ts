import { Component, Input } from '@angular/core';
import { LucidePencil } from '@lucide/angular';

@Component({
  selector: 'edit-component',
  templateUrl: './edit-component.html',
  styleUrl: './edit-component.css',
  imports: [LucidePencil],
})
export class EditComponent {
  @Input() title = '';
}
