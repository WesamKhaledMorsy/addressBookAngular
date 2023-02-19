import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { JobService } from '../job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Job } from '../job.model';
import swal from 'sweetalert2';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent {
  editMode :boolean =false;  //? write editMode to check if we are in edit mode or Add mode
  isAddMode : boolean | undefined;        //?  write AddMode to check if we are in edit mode or Add mode
  JobId !:string ;

  @Input() jobInput : Job = new Job();
  @Output() jobUpdated= new EventEmitter <Job>();

  constructor(private http :HttpClient,
    private jobServices : JobService ,
    private route:ActivatedRoute,
    private router: Router,
    public modal:NgbActiveModal,
    private modalServices: NgbModal,
    private formBuilder :FormBuilder){

  }
   editForm = new FormGroup({
    id:new FormControl(''),
    jobTitle:new FormControl('')
   });
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  this.editForm;

  }
  get editFormData(){
  return this.editForm.controls;
  }

//  onSubmit(){
//       this.editForm.addControl('id',this.formBuilder
//       .control('',[Validators.required]));
//       this.editForm.addControl('jobTitle', this.formBuilder
//         .control('', [Validators.required]));
//       this.jobServices.UpdateJob(this.jobInput)
//           .subscribe((UpJob)=>{
//           this.jobUpdated.emit(UpJob);
//       })
//       //!==
//       debugger
//       swal.fire({
//         position: 'top-end',
//         icon: 'success',
//         title: 'Job Updated Successfully',
//         showConfirmButton: false,
//         timer: 1500
//       });
//        this.router.navigate(['/job/jobList'])
//     //!==
//     this.modal.close();
//   }

//   closeModal(){
//     this.modal.close();
//   }
  // editJob(jobEdit:Job){
  //   this.jobInput=jobEdit;
  // const ref = this.modalServices.open(JobEditComponent);
  // debugger
  // this.jobServices.UpdateJob(this.jobInput)
  //     .subscribe((UpJOb)=>this.jobUpdated.emit(UpJOb));
  // // let itemInLocalStorage = jobEdit;
  // // localStorage.setItem("Job",itemInLocalStorage.id + itemInLocalStorage.jobTitle);
  // ref.componentInstance.jobEdit=this.jobInput;
  // debugger
  // ref.result.then((yes)=>{

  //   console.log("ok Click", jobEdit);
  // },(cancel)=>{
  //   console.log("cancel");
  // })
  // }
}
