import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { DataService } from '../../services/data.service';
import { Employee } from '../../interfaces/Employee';

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
    id: null,
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
    if (this.employeeForm.controls['id'].value)
      this._dataService
        .updateEmployee(
          Number(this.employeeForm.controls['id'].value),
          this.employeeForm.value as any,
        )
        .subscribe((res) => {
          this.getEmployees();
        });
    else
      this._dataService
        .addEmployee(this.employeeForm.value as any)
        .subscribe((res) => {
          this.getEmployees();
        });

    this.employeeForm.reset();
  }

  onDelete(id: number) {
    this._dataService.deleteEmployee(id).subscribe((res) => {
      this.getEmployees();
    });
  }

  onEdit(id: number) {
    const employeeToUpdate = this.employees.find((emp: Employee) => emp.id === id);

    this.employeeForm.setValue({
      id: employeeToUpdate.id,
      name: employeeToUpdate.name,
      age: employeeToUpdate.age,
    });
  }
}
