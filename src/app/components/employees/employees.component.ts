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

  employees: Employee[] = [];

  employeeForm = this._formBuilder.group({
    id: <number | null>null,
    name: ['', Validators.required],
    age: [0, [Validators.required, Validators.min(1)]],
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
          this.employeeForm.value as Partial<Employee>,
        )
        .subscribe((res) => {
          this.employees = this.employees.map((emp) =>
            emp.id === res.id ? { ...emp, ...res } : emp,
          );
        });
    else
      this._dataService
        .addEmployee(this.employeeForm.value as Employee)
        .subscribe((res) => {
          this.employees.push(res);
        });

    this.employeeForm.reset();
  }

  onDelete(id: number) {
    this._dataService.deleteEmployee(id).subscribe((res) => {
      this.employees = this.employees.filter((emp) => emp.id !== id);
    });
  }

  onEdit(id: number) {
    const employeeToUpdate = this.employees.find((emp) => emp.id === id);

    if (employeeToUpdate)
      this.employeeForm.setValue({
        id: employeeToUpdate.id,
        name: employeeToUpdate.name,
        age: employeeToUpdate.age,
      });
  }
}
