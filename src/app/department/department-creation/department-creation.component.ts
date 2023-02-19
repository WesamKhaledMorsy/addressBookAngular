import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Department } from '../department.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DepartmentService } from '../department.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HandleErrorService } from 'src/app/core/http/handle-error.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-department-creation',
  templateUrl: './department-creation.component.html',
  styleUrls: ['./department-creation.component.css']
})
export class DepartmentCreationComponent {
  departmentData :Department[]=[];
  editMode :boolean =false;  //? write editMode to check if we are in edit mode or Add mode
  isAddMode : boolean =false;        //?  write AddMode to check if we are in edit mode or Add mode
  departmentId !:string ;

  @Input() departmentInput : Department = new Department();
  @Output() DepartmentUpdated= new EventEmitter <Department>();


  @Output() dateRangeSelected: EventEmitter<{}> = new EventEmitter();
  @ViewChild('dp', { static: true }) datePicker: any;

  //headers:HttpHeaders;
  constructor(private http :HttpClient,
    private departmnetServices : DepartmentService ,
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
      this.departmentId+=id;
      this.isAddMode =! id;
      if(id)
    {
      this.departmnetServices.getDepartmentById(id.toString()).subscribe((result:any)=>{
        debugger
        //this.bookInput.id=result[0].id;
        this.departmentInput.departmentName=result[0].departmentName;

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
    departmentName: ['', [Validators.required]]
  });

  onSubmit(){
    if(this.isAddMode){
      const headers = new HttpHeaders({
        Authorization :`Bearer ${localStorage.getItem('jwt')}`,
      });
        debugger
        const body =new Department();
        body.departmentName = this.AddForm.controls['departmentName'].value;

        this.http.post<any>
        ('https://localhost:7199/api/Department/CreateNewDepartment',body
          ,{headers:headers})
        .subscribe(data => {
          console.log(data)
          //!==
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Department created Successfully',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/department/departmentList']);
      //!==
      })
    }
    else{
      debugger
      this.departmentInput.id = '';
      this.departmentInput.id += this.route.snapshot.paramMap.get("id")?.toString();
      this.departmnetServices.UpdateDepartment(this.departmentInput)
          .subscribe((UpDepartment)=>{
          this.DepartmentUpdated.emit(UpDepartment);
      })
      //!==
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Department Updated Successfully',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/department/departmentList'])
    //!==
    }
  }
}
