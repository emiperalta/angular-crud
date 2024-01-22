import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent {
  private _dataService = inject(DataService);
  private _formBuilder = inject(FormBuilder);

  employees: any = [];

  employeeForm = this._formBuilder.group({
    name: ['', Validators.required],
    age: ['', Validators.required],
  });

  constructor() {
    this.getEmployees();
  }

  getEmployees() {
    this._dataService.getEmployees().subscribe((response) => {
      this.employees = response;
    });
  }

  onSubmit() {
    if (this.employeeForm.valid)
      this._dataService.addEmployee(this.employeeForm.value).subscribe((res) => {
        this.getEmployees();
      });
  }

  onDelete(id: number) {
    this._dataService.deleteEmployee(id).subscribe((res) => {
      this.getEmployees();
    });
  }
}
