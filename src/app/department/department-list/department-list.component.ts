import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Department } from '../department.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import swal from 'sweetalert2';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent  {


  searchText :any;

  isAuth : boolean =false;
  @Input() DepartmentInput !:Department;
  @Output() DepartmentUpdated =new EventEmitter<Department>();
constructor(private http : HttpClient,
  public formBuilder : FormBuilder,public route:Router){

}
ngOnInit(): void {

  //const role :any =localStorage.getItem('roles');

  this.FilterDepartments();
}


  getAllDepartments(
    id:string,
    departmentName:string,
    pageIndex:number,
    pageSize:number
  ): Observable <Department[]>{
    const headers = new HttpHeaders({
      Authorization :`Bearer ${localStorage.getItem('jwt')}`,
    });
   this. isAuth = true;
    let url=`https://localhost:7199/api/Department/GetAllDepartments?pageIndex=${pageIndex}&pageSize=${pageSize}`
    if(id!="")url +=`&id=${id}`;
    if(departmentName!="") url+=`&departmentName=${departmentName}`;
  debugger
    return this.http.get<Department[]>(url
      ,{headers:headers});
  }


  id:string="" ;
  departmentName:string="" ;
  _pageIndex =1;
  _pageSize=20;

  selectedDepartments : Department[]=[];
  DepartmentData : Department[]=[];
  FilterDepartments(){
    this.getAllDepartments(
      this.id,
      this.departmentName,
      this._pageIndex,
      this._pageSize
    ).subscribe((result:Department[])=>
    {
      debugger
      this.selectedDepartments=result;
      this.DepartmentData=this.selectedDepartments;
      console.log(this.DepartmentData[0].departmentName);
      return this.DepartmentData;
    })
  }

  filteration: any | undefined = {} ;

  Reset(){
    this.filteration= {};
    this.FilterDepartments();
}

sortName(){
  this.DepartmentData.sort((a,b) => a.departmentName.localeCompare(b.departmentName));
}

deleteDepartment(departmentId:string){
  const headers = new HttpHeaders({
    Authorization :`Bearer ${localStorage.getItem('jwt')}`,
  });
  let url ='https://localhost:7199/api/Department/DeleteDepartment';
  if(departmentId!="")
    url +=`?id=${departmentId}`
debugger
    return this.http.delete<Department>(url
    ,{headers:headers});
}

onDeleteDepartment(departmentId:string) {
  const swalWithBootstrapButtons = swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger ms-2'
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons
    .fire({
      title: 'Are you sure?',
      text: 'You wont be able to revert this!',
      icon: 'question',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      showCancelButton: true
    })
    .then(result => {
      if (result.value) {
        //!main code for delete
        console.log(result.value)
        this.deleteDepartment(departmentId)
          .subscribe((_depart)=> {
            debugger
            this.DepartmentUpdated.emit(_depart);
            this.FilterDepartments();
          });
          //!===============
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Department has been deleted.',
          'success'
        );

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Job is safe :)',
          'error'
        );
      }
    }
    );

}

}
