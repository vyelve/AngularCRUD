import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Department } from 'src/app/models/department-model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  formData: Department;
  apiUrl = 'https://localhost:44391/api/department';

  getDepartmentList(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl + '/GetDepartmentDetails');
  }

  getDepartmentById(deptId: string): Observable<Department> {
    return this.http.get<Department>(this.apiUrl + '/GetDepartmentByID/' + deptId);
  }

  addDepartment(dept: Department): Observable<Department> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Department>(this.apiUrl + '/InsertDepartmentDetails', dept, httpOptions);
  }

  updateDepartment(dept: Department): Observable<Department> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Department>(this.apiUrl + '/UpdateDepartmentDetails/', dept, httpOptions);
  }

  deleteDepartment(deptId: number): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.apiUrl + '/DeleteDepartmentDetails?id=' + deptId, httpOptions);
  }

  private _listners = new Subject<any>();
  listen(): Observable<any> {
    return this._listners.asObservable();
  }

  filter(_filterBy: string) {
    this._listners.next(_filterBy);
  }
}
