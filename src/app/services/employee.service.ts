import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Employee } from '../models/employee-model';
import { Observable, Subject } from 'rxjs';
import { Department } from '../models/department-model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  formData: Employee;
  apiUrl = 'https://localhost:44391/api/employee';
  apiUrlDept = 'https://localhost:44391/api/department';

  getEmployeeList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl + '/GetEmployeeDetails');
  }

  getEmployeeById(empId: string): Observable<Employee> {
    return this.http.get<Employee>(this.apiUrl + '/GetEmployeeByID/' + empId);
  }

  addEmployee(emp: Employee): Observable<Employee> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Employee>(this.apiUrl + '/InsertEmployeeDetails', emp, httpOptions);
  }

  updateEmployee(emp: Employee): Observable<Employee> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Employee>(this.apiUrl + '/UpdateEmployeeDetails/', emp, httpOptions);
  }

  deleteEmployee(empId: number): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.apiUrl + '/DeleteEmployeeDetails?id=' + empId, httpOptions);
  }

  private _listners = new Subject<any>();
  listen(): Observable<any> {
    return this._listners.asObservable();
  }

  filter(_filterBy: string) {
    this._listners.next(_filterBy);
  }

  getDepDropDownValues(): Observable<any> {
    return this.http.get<Department[]>(this.apiUrlDept + '/GetDepartmentDetails');
  }

}
