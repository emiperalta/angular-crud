import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Employee } from '../interfaces/Employee';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _httpClient = inject(HttpClient);

  getEmployees() {
    return this._httpClient.get<Employee[]>('/api/employees');
  }

  addEmployee(payload: Employee) {
    return this._httpClient.post<Employee>('/api/employees', payload);
  }

  deleteEmployee(id: number) {
    return this._httpClient.delete(`/api/employees/${id}`);
  }

  updateEmployee(id: number, payload: Partial<Employee>) {
    return this._httpClient.patch<Employee>(`/api/employees/${id}`, payload);
  }
}
