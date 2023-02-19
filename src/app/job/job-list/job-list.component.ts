import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Job } from '../job.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobEditComponent } from '../job-edit/job-edit.component';
import { JobService } from '../job.service';
@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],

})
export class JobListComponent  {
  selectJobs !: Job[] ;
  searchText :any;

  isAuth : boolean =true;
  @Input() JobInput !:Job;
  @Output() JobUpdated =new EventEmitter<Job>();
constructor(private http : HttpClient,
  public formBuilder : FormBuilder,public route:Router,
  private modalServices: NgbModal,
  private jobService:JobService){

}
ngOnInit(): void {

  //const role :any =localStorage.getItem('roles');
  this.FilterJobs();
}
formatDate(date: string | number | Date) {
  var d = new Date(date),
    day = "" + d.getDate(),
    month = "" + (d.getMonth() + 1),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day].join("-");
}

  getAllJobs(
    id:string,
    jobTitle:string,
    pageIndex:number,
    pageSize:number
  ): Observable <Job[]>{
    const headers = new HttpHeaders({
      Authorization :`Bearer ${localStorage.getItem('jwt')}`,
    });
   this. isAuth = true;
    let url=`https://localhost:7199/api/Job/GetAllJobs?pageIndex=${pageIndex}&pageSize=${pageSize}`
    if(id!="")url +=`&id=${id}`;
    if(jobTitle!="") url+=`&jobTitle=${jobTitle}`;
  debugger
    return this.http.get<Job[]>(url
      ,{headers:headers});
  }


  id:string="" ;
  jobTitle:string="" ;
  _pageIndex =1;
  _pageSize=20;

  selectedJobs : Job[]=[];
  JobData : Job[]=[];
  FilterJobs(){
    this.getAllJobs(
      this.id,
      this.jobTitle,
      this._pageIndex,
      this._pageSize
    ).subscribe((result:Job[])=>
    {
      debugger
      this.selectedJobs=result;
      this.JobData=this.selectedJobs;
      console.log(this.JobData[0].jobTitle);
      return this.JobData;
    })
  }

sortName(){
  this.JobData.sort((a,b) => a.jobTitle.localeCompare(b.jobTitle));
}
deleteJob(jobId:string){
  const headers = new HttpHeaders({
    Authorization :`Bearer ${localStorage.getItem('jwt')}`,
  });
  let url ='https://localhost:7199/api/Job/DeleteJob';
  if(jobId!="")
    url +=`?id=${jobId}`
debugger
    return this.http.delete<Job>(url
    ,{headers:headers});
}

onDeleteJob(jobId:string) {
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
        this.deleteJob(jobId)
          .subscribe((_job)=> {
            debugger
            this.JobUpdated.emit(_job);
            this.FilterJobs();
          });
          //!===============
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Job has been deleted.',
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

isAddMode : boolean | undefined;
JobId :string ='';

// editJob(jobEdit:Job){
//   this.JobInput=jobEdit;
// const ref = this.modalServices.open(JobEditComponent);
// debugger
// this.jobService.UpdateJob(this.JobInput)
//     .subscribe((UpJOb)=>this.JobUpdated.emit(UpJOb));

// // let itemInLocalStorage = jobEdit;
// // localStorage.setItem("Job",itemInLocalStorage.id + itemInLocalStorage.jobTitle);
// ref.componentInstance.jobEdit=this.JobInput;
// debugger
// ref.result.then((yes)=>{

//   console.log("ok Click", jobEdit);
// },(cancel)=>{
//   console.log("cancel");
// })
// }

}
