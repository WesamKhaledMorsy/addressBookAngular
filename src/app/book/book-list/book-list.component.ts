import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../book.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import swal from 'sweetalert2';

import { Department } from 'src/app/department/department.model';
import { Job } from 'src/app/job/job.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookCreationComponent } from '../book-creation/book-creation.component';
import { BookEditComponent } from '../book-edit/book-edit.component';
import { BookService } from '../book.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],

})


export class BookListComponent {
  // minDate = new Date(2000, 0, 1);
  // maxDate = new Date(2020, 0, 1);
  // myFilter = (d: Date): boolean => {
  //   const day = d.getDay();
  //   // Prevent Saturday and Sunday from being selected.
  //   return day !== 0 && day !== 6;
  // }
  isValidFormSubmitted: any ;
  departments: Department[]=[];
  jobs:Job[]=[];

  searchText :any;

  isAuth : boolean =false;

  isAddMode: boolean =false;
  @Input() BookInput :Book|undefined;
  @Output() BookUpdated =new EventEmitter<Book>();

constructor(private http : HttpClient,
  public formBuilder : FormBuilder,public route:Router,
  private router:ActivatedRoute,
  private modalServices: NgbModal,
  private bookService:BookService,
  ){

}
ngOnInit(): void {

  //const role :any =localStorage.getItem('roles');
  this.Reset();
  this.FilterBooks();
this.GetAllBookData();
// this.Reset();
}


  getAllBooks(
    id:string,
    fullName:string,
    mobile:string,
    address:string,
    dateOfBirth: string,
    age :number,
    departmentId:string,
    jobId:string,
    pageIndex:number,
    pageSize:number
  ): Observable <Book[]>{
    const headers = new HttpHeaders({
      Authorization :`Bearer ${localStorage.getItem('jwt')}`,
    });
   //this. isAuth = true;
    let url=`https://localhost:7199/api/Book/GetAllBooks?pageIndex=${pageIndex}&pageSize=${pageSize}`
    if(id!="")url +=`&id=${id}`;
    if(fullName!="") url+=`&fullName=${fullName}`;
    if(mobile!="") url+=`&mobile${mobile}`;
    if(address!="") url+=`&address${address}`;
    if(dateOfBirth!="") url+=`&dateOfBirth${dateOfBirth}`;
    if(age!=null) url+=`&age${age}`;
    if(departmentId!="") url+=`&departmentId${departmentId}`;
    if(jobId!="") url+=`&jobId${jobId}`;
  debugger
    return this.http.get<Book[]>(url
      ,{headers:headers});
  }


  id:string="" ;
  fullName:string="" ;
  mobile:string="";
    address:string="";
    dateOfBirth: string="";
    age !: number ;
    departmentId :string="";
    jobId:string="";
    photo:string="";
  _pageIndex =1;
  _pageSize=40;

  selectedBooks : Book[]=[];
  BookData : Book[]=[];
  FilterBooks(){
    this.getAllBooks(
      this.id,
      this.fullName,
      this.mobile,
      this.address,
      this.dateOfBirth,
      this.age,
      this.departmentId,
      this.jobId,
      this._pageIndex,
      this._pageSize
    ).subscribe((result:Book[])=>
    {
      debugger
      this.selectedBooks=result;
      this.BookData=this.selectedBooks;
      console.log(this.BookData);
      return this.BookData;
    })
    debugger
  }

searchForm :  FormGroup= this.formBuilder.group({
FullName:['',[Validators.required,Validators.maxLength(15)]],
Mobile:['',[Validators.maxLength(11),Validators.minLength(11),Validators.required]],
Address:['',Validators.minLength(5)],
DateOfBirth:['',[Validators.required]],
Age:['',[Validators.required,Validators.maxLength(2)]],
DepartmentId:['',Validators.required],
JobId:['',Validators.required],
})

Reset(){
 this.fullName="" ;
 this. mobile="";
 this.  address="";
 this.dateOfBirth="";
 this.age ;
 this.  departmentId ="";
 this. jobId="";
 this._pageIndex =1;
 this. _pageSize=40;
    this.FilterBooks();
}

sortName(){
  this.BookData.sort((a,b) => a.fullName.localeCompare(b.fullName));
}

deleteBook(bookId:string){
  const headers = new HttpHeaders({
    Authorization :`Bearer ${localStorage.getItem('jwt')}`,
  });
  let url ='https://localhost:7199/api/Book/DeleteBook';
  if(bookId!="")
    url +=`?id=${bookId}`
debugger
    return this.http.delete<Book>(url
    ,{headers:headers});
}

onDeleteBook(bookId:string) {
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
        this.deleteBook(bookId)
          .subscribe((_book)=> {
            debugger
            this.BookUpdated.emit(_book);
            this.getAllBooks(this.id,
              this.fullName,
              this.mobile,
              this.address,
              this.dateOfBirth,
              this.age,
              this.departmentId,
              this.jobId,
              this._pageIndex,
              this._pageSize)
          });
          //!===============
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Book has been deleted.',
          'success'
        );
        this.FilterBooks();
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Book is safe :)',
          'error'
        );
      }
    }
    );
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

// isAddMode : boolean | undefined;
// BookId :string ='';

// editBook(bookEdit:Book){
// const ref = this.modalServices.open(BookEditComponent);

// this.bookService.UpdateBook(bookEdit)
//     .subscribe((UpBook:any)=>this.BookUpdated.emit(UpBook));

// ref.componentInstance.bookEdit=bookEdit;
// debugger
// ref.result.then((yes)=>{
//   console.log("ok Click");
// },(cancel)=>{
//   console.log("cancel");
// })
// }

_GetAllBookData():Observable<Book>{
    const headers = new HttpHeaders({
    Authorization :`Bearer ${localStorage.getItem('jwt')}`,
  });
    let url ='https://localhost:7199/api/Book/GetAllBookData';
    return this.http.get<any>(url
    ,{headers:headers});
  }


  GetAllBookData(){
    debugger
    this._GetAllBookData().subscribe((result : any)=> {
      this.jobs=result.jobs;
      this.departments=result.departments;
      console.log(this.jobs,this.departments)
      debugger
    });
  }


  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFileXLSX(wb, "Book"+".xlsm");
  }
}
