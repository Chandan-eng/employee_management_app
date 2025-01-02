import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http:HttpClient) { }

  addEmployee(emp:any): Observable<any> {
    return this._http.post('http://localhost:3000/employees', emp);
  }
  getEmployeesList(): Observable<any> {
    return this._http.get('http://localhost:3000/employees');
  }

  deleteEmployee(id:number): Observable<any> {
    return this._http.delete(`http://localhost:3000/employees/${id}`);
  }

  updateEmployee(id:number,emp:any): Observable<any> {
    return this._http.put(`http://localhost:3000/employees/${id}`, emp);
  }

}
