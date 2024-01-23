import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Employee } from '../interfaces/Employee';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  getEmployees() {
    return this.httpClient.get('/api/employees');
  }

  addEmployee(payload: Employee) {
    return this.httpClient.post('/api/employees', payload);
  }

  deleteEmployee(id: number) {
    return this.httpClient.delete(`/api/employees/${id}`);
  }

  updateEmployee(id: number, payload: Partial<Employee>) {
    return this.httpClient.patch(`/api/employees/${id}`, payload);
  }
}
