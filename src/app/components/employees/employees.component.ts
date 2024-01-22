import { Component, inject } from '@angular/core';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent {
  private _dataService = inject(DataService);

  employees: any = [];

  constructor() {
    this._dataService.getEmployees().subscribe((response) => {
      this.employees = response;
    });
  }
}
