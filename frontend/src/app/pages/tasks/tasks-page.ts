import { Component } from '@angular/core';
import { ModalComponent } from '../../components/input-modal/modal-component';
interface User {
  id: number;
  name: string;
  description: string;
  endDate: string;
  state: 'not started' | 'in progress' | 'completed';
}

@Component({
  selector: 'tasks-page',
  templateUrl: './tasks-page.html',
  standalone: true,
  imports: [ModalComponent],
})
export class TasksPage {
  // userData: User[] = [
  //   {
  //     id: 1,
  //     name: 'John Doe',
  //     description: 'Prepare the food',
  //     endDate: '2026-11-06',
  //     state: 'not started',
  //   },
  //   {
  //     id: 2,
  //     name: 'Jane Smith',
  //     description: 'Prepare the food',
  //     endDate: '2026-11-06',
  //     state: 'not started',
  //   },
  // ];
  // userColumns: { key: keyof User; label: string }[] = [
  //   { key: 'id', label: 'Id' },
  //   { key: 'name', label: 'Name' },
  //   { key: 'description', label: 'Description' },
  //   { key: 'endDate', label: 'End Date' },
  //   { key: 'state', label: 'State' },
  // ];
}
