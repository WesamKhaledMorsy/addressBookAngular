import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Book } from '../book.model';
import { Department } from 'src/app/department/department.model';
import { Job } from 'src/app/job/job.model';
import { HttpClient } from '@angular/common/http';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent {
//   bookData :Book[]=[];
//   newBook ?:Book ;
//   editMode :boolean =false;  //? write editMode to check if we are in edit mode or Add mode
//   isAddMode : boolean | undefined;        //?  write AddMode to check if we are in edit mode or Add mode
//   BookId !:string ;

//   departments: Department[]=[];
//   jobs:Job[]=[];

//   @Input() bookInput : Book = new Book();
//   @Output() bookUpdated= new EventEmitter <Book[]>();


//   @Output() dateRangeSelected: EventEmitter<{}> = new EventEmitter();
//   @ViewChild('dp', { static: true }) datePicker: any;
//   constructor(private http :HttpClient,
//     private bookServices : BookService ,
//     private route:ActivatedRoute,
//     private router: Router,
//     public modal:NgbActiveModal,
//     private formBuilder :FormBuilder
//     ) { }
// editForm = new FormGroup({
// fullName :new FormControl(''),
// dateOfBith: new FormControl(''),
// mobile : new FormControl(''),
// address:new FormControl(''),
// age: new FormControl(''),
// departmentId : new FormControl(''),
// jobId : new FormControl('')
// });


//   ngOnInit(): void {
//      // Catch the Id from  URL

//      this.route.paramMap.subscribe((params)=>{
//       const id =params.get("id");
//       console.log(params.get("id"));
//       this.BookId+=id;
//       this.isAddMode =! id;
//       if(id)
//     {
//       this.bookServices.getBookById(id.toString()).subscribe((result:any)=>{

//         debugger
//         //this.bookInput.id=result[0].id;
//         this.bookInput.fullName=result[0].fullName;
//         this.bookInput.dateOfBirth=this.formatDate(result[0].dateOfBirth);
//         this.bookInput.mobile=result[0].mobile;
//         this.bookInput.address=result[0].address;
//         this.bookInput.age=result[0].age;
//         this.bookInput.departmentId=result[0].departmentId;
//         this.bookInput.jobId=result[0].jobId;
//         console.log(result[0].id);
//       }
//     );
//     }
//     });
//     this.GetAllBookData();
//   }

//   formatDate(date: string | number | Date) {
//     var d = new Date(date),
//       day = "" + d.getDate(),
//       month = "" + (d.getMonth() + 1),
//       year = d.getFullYear();

//     if (month.length < 2) month = "0" + month;
//     if (day.length < 2) day = "0" + day;
//     return [year, month, day].join("-");
//   }

//   onSubmit(form:NgForm){
//       debugger
//       this.bookInput.id = '';
//       this.bookInput.id +=  this.route.snapshot.paramMap.get("id")?.toString();
//       this.bookServices.UpdateBook(this.bookInput)
//           .subscribe((UpBook)=>{
//           this.bookUpdated.emit(UpBook);
//       })
//       //!==
//       swal.fire({
//         position: 'top-end',
//         icon: 'success',
//         title: 'Book Updated Successfully',
//         showConfirmButton: false,
//         timer: 1500
//       });
//       this.router.navigate(['/book/bookList'])
//     //!==
//     this.modal.close();

//         form.reset(this.bookInput);
//   }

//   closeModal(){
//     this.modal.close();
//   }

//   _GetAllBookData():Observable<Book>{
//   //   const headers = new HttpHeaders({
//   //   Authorization :`Bearer ${localStorage.getItem('jwt')}`,
//   // });
//     let url ='https://localhost:7199/api/Book/GetAllBookData';
//     return this.http.get<any>(url);
//       //,{headers:headers});
//   }


//   GetAllBookData(){
//     debugger
//     this._GetAllBookData().subscribe((result : any)=> {
//       this.jobs=result.jobs;
//       this.departments=result.departments;
//       console.log(this.jobs,this.departments)
//       debugger
//     });
//   }

}
