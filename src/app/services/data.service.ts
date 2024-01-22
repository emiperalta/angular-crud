import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  getEmployees() {
    return this.httpClient.get('/api/employees');
  }

  addEmployee(payload: any) {
    return this.httpClient.post('/api/employees', payload);
  }

  deleteEmployee(id: number) {
    return this.httpClient.delete(`/api/employees/${id}`);
  }
}
