import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Department } from './department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http:HttpClient) { }
  public getDepartmentById(id:string) : Observable <any>{
    // const headers = new HttpHeaders({
    //   Authorization :`Bearer ${localStorage.getItem('jwt')}`,
    // });
    let url='https://localhost:7199/api/Department/GetDepartmentById';
    if (id!="")
      url += `?id=${id}`

    return this.http.get<Department>(
      url);
    //   ,{headers:headers}
    // );
  }

  public UpdateDepartment(department: Department): Observable<Department> {
    // const headers = new HttpHeaders({
    //   Authorization :`Bearer ${localStorage.getItem('jwt')}`,
    // });
    debugger
    return this.http.put<Department>(
      'https://localhost:7199/api/Department/EditDepartment',
      department);
    //   ,{headers:headers}
    // );
  }
}
