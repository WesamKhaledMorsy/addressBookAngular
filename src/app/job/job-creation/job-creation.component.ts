import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Book } from 'src/app/book/book.model';
import { Job } from '../job.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JobService } from '../job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HandleErrorService } from 'src/app/core/http/handle-error.service';

@Component({
  selector: 'app-job-creation',
  templateUrl: './job-creation.component.html',
  styleUrls: ['./job-creation.component.css']
})
export class JobCreationComponent {
  jobData :Book[]=[];
  editMode :boolean =false;  //? write editMode to check if we are in edit mode or Add mode
  isAddMode : boolean =false;        //?  write AddMode to check if we are in edit mode or Add mode
  jobId !:string ;

  @Input() JobInput : Job = new Job();
  @Output() JobUpdated= new EventEmitter <Job>();


  @Output() dateRangeSelected: EventEmitter<{}> = new EventEmitter();
  @ViewChild('dp', { static: true }) datePicker: any;

  //headers:HttpHeaders;
  constructor(private http :HttpClient,
    private JobServices : JobService ,
    private route:ActivatedRoute,
    private router: Router,
    private formBuilder :FormBuilder,
    private handleErrorService :HandleErrorService
    ) {
      // const headers ={guest:'true', language:'en'};
      // this.headers=new HttpHeaders(headers);
     }


  ngOnInit(): void {
      // Catch the Id from  URL
      this.isAddMode =true;
      this.route.paramMap.subscribe((params)=>{
      const id =params.get("id");
      console.log(params.get("id"));
      this.jobId+=id;
      this.isAddMode =! id;
      if(id)
    {
      this.JobServices.getJobById(id.toString()).subscribe((result:any)=>{
        debugger
        //this.bookInput.id=result[0].id;
        this.JobInput.jobTitle=result[0].jobTitle;

        console.log(result[0].id);
      }
    );
    }
    });
    this.AddForm;
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


  AddForm: FormGroup = this.formBuilder.group({
    id:[''],
    jobTitle: ['', [Validators.required]]
  });

  onSubmit(){
    if(this.isAddMode){
      const headers = new HttpHeaders({
        Authorization :`Bearer ${localStorage.getItem('jwt')}`,
      });
        debugger
        const body =new Job();
        body.jobTitle = this.AddForm.controls['jobTitle'].value;

        this.http.post<any>
        ('https://localhost:7199/api/job/CreateNewJob',body
          ,{headers:headers})
        .subscribe(data => {
          console.log(data)
          //!==
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Job created Successfully',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/job/jobList']);
      //!==
      })
    }
    else{
      debugger
      this.JobInput.id = '';
      this.JobInput.id += this.route.snapshot.paramMap.get("id")?.toString();
      this.JobServices.UpdateJob(this.JobInput)
          .subscribe((UpJob)=>{
          this.JobUpdated.emit(UpJob);
      })
      //!==
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Job Updated Successfully',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/job/jobList'])
    //!==
    }
  }
}
