import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Book } from '../book.model';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, NgModel,FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { Department } from 'src/app/department/department.model';
import { Job } from 'src/app/job/job.model';
import { Observable } from 'rxjs/internal/Observable';
import { forbiddenNameValidator } from 'src/app/forbidden-validator-directive.directive';
import { Guid } from 'guid-typescript';


@Component({
  selector: 'app-book-creation',
  templateUrl: './book-creation.component.html',
  styleUrls: ['./book-creation.component.css']
})
export class BookCreationComponent {
  bookData :Book[]=[];
  newBook ?:Book ;
  editMode :boolean =false;  //? write editMode to check if we are in edit mode or Add mode
  isAddMode : boolean | undefined;        //?  write AddMode to check if we are in edit mode or Add mode
  BookId :string='' ;

  departments: Department[]=[];
  jobs:Job[]=[];
  isValidFormSubmitted :boolean |undefined;
  @Input() bookInput : Book = new Book();
  @Output() bookUpdated= new EventEmitter <Book[]>();


  @Output() dateRangeSelected: EventEmitter<{}> = new EventEmitter();
  @ViewChild('dp', { static: true }) datePicker: any;
  constructor(private http :HttpClient,
    private bookServices : BookService ,
    private route:ActivatedRoute,
    private router: Router,
    private formBuilder :FormBuilder,
    ) {
      this.AddForm;
     }

  ngOnInit(): void {
     // Catch the Id from  URL
     this.route.paramMap.subscribe((params)=>{
      const id =params.get("id");
      console.log(params.get("id"));
      this.BookId+=id;
      this.isAddMode =! id;
      if(id)
    {
      this.bookServices.getBookById(id.toString()).subscribe((result:any)=>{

        debugger
        //this.bookInput.id=result[0].id;
        this.bookInput.fullName=result[0].fullName;
        this.bookInput.dateOfBirth=this.formatDate(result[0].dateOfBirth);
        this.bookInput.mobile=result[0].mobile;
        this.bookInput.address=result[0].address;
        this.bookInput.age=result[0].age;
        this.bookInput.departmentId=result[0].departmentId;
        this.bookInput.jobId=result[0].jobId;
        this.bookInput.photo=result[0].photo;
        console.log(result[0].id);
      }
    );
    }
    });
    this.GetAllBookData();
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
    //id:[''],
    fullName: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(20),forbiddenNameValidator(/bob/i) ]],
    mobile:['',[Validators.required,Validators.pattern("^[0-9]*$")]],
    address:['',[Validators.required]],
    age:['',Validators.required,Validators.max(2),Validators.pattern("^[0-9]*$")],
    dateOfBirth:['',[Validators.required]],
    departmentId:['',[Validators.required]],
    jobId:['',[Validators.required]],
    photo:['',[Validators.required]]
  });
  get age() { return this.AddForm.get('age') as FormControl; }

  get mobile() { return this.AddForm.get('mobile') as FormControl; }

  get fullName(){return this.AddForm.get('fullName') as FormControl;}

  get AddFormControl() {
    debugger
    return this.AddForm.controls;
  }
  onSubmit(){
    if(this.isAddMode){
      this.isValidFormSubmitted = false;
      if(this.AddForm.invalid){
        return;
      }
      this.isValidFormSubmitted = true;
      const headers = new HttpHeaders({
        Authorization :`Bearer ${localStorage.getItem('jwt')}`,
      });
        const book = new Book();
        book.fullName = this.AddForm.controls['fullName'].value;
        book.mobile = this.AddForm.controls['mobile'].value;
        book.address = this.AddForm.controls['address'].value;
        book.age = this.AddForm.controls['age'].value;
        book.dateOfBirth=this.AddForm.controls['dateOfBirth'].value;
        book.departmentId = this.AddForm.controls['departmentId'].value;
        book.jobId = this.AddForm.controls['jobId'].value;
        book.photo=this.AddForm.controls['photo'].value;
        debugger
        console.log(this.AddForm.value);
      this.http.post<any>
        ('https://localhost:7199/api/Book/CreateNewBook',book
         ,{headers:headers})
         .subscribe(data => {
          console.log(data)
          //!==
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Book created Successfully',
          showConfirmButton: false,
          timer: 1500
        });
        this.AddForm.reset();
        this.router.navigate(['/book/bookList']);
      //!==
      })

    }
    else{
      debugger
      this.bookInput.id = '';
      this.bookInput.id +=  this.route.snapshot.paramMap.get("id")?.toString();
      this.bookServices.UpdateBook(this.bookInput)
          .subscribe((UpBook)=>{
          this.bookUpdated.emit(UpBook);
      })
      //!==
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Book Updated Successfully',
        showConfirmButton: false,
        timer: 1500
      });
       this.router.navigate(['/book/bookList'])
    //!==
    }

  }


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


  files:any[] =[];
  message: string | undefined;
  progress: number | undefined;
  @Output() onUploadFinished=new EventEmitter();
  selectedFiles!: File;


   isUploaded :boolean | undefined;
  //  uploadPhoto =(files:any,bookId: string) => {
  //   const headers = new HttpHeaders({
  //     Authorization :`Bearer ${localStorage.getItem('jwt')}`,
  //   });

  //   bookId = this.BookId;
  //   // this.selectedFiles=files;
  //   if (files.length==0) return null;

  //   let fileToUpload=<File>files.addedFiles[0];
  //   const formData=new FormData();
  //   debugger;
  //   formData.append("file", fileToUpload, fileToUpload.name);
  //   console.log(this.selectedFiles)
  //   console.log(fileToUpload.name)
  // let url ='https://localhost:7199/api/Book/UploadFiles';
  //   if(bookId!=""){url +=`?id=${bookId}`}
  //   this.isUploaded =true;
  //   formData.append("FileName", fileToUpload, fileToUpload.name);
  //     return this.http.post<Book>(url
  //     , formData
  //     ,
  //      {
  //       reportProgress: true,
  //       observe: "events",
  //      headers:headers
  //     }
  //     )
  //     .subscribe((event) => {
  //       if (event.type===HttpEventType.UploadProgress) {
  //         event.total;
  //         this.progress=Math.round((100*event.loaded)/event.loaded);
  //       } else if (event.type===HttpEventType.Response) {
  //         this.message="Uploaded success.";
  //         this.onUploadFinished.emit(event.body);
  //       }
  //     });
  // };

  fileSelected(event: any){
console.log(event.target.files[0]);
this.selectedFiles=<File>event.target.files[0];
  }

  onUpLoad(){
    const formData=new FormData();
     this.BookId;
     const headers = new HttpHeaders({
      Authorization :`Bearer ${localStorage.getItem('jwt')}`,
    });
    let url ='https://localhost:7199/api/Book/UploadFiles';
    if(this.BookId!=""){url +=`?id=${this.BookId}`}
    this.isUploaded =true;
    formData.append('image',this.selectedFiles,this.selectedFiles.name);
      return this.http.post<Book>(url
      , formData,{reportProgress:true,observe:"events",headers:headers})
      .subscribe(event => {
        if (event.type===HttpEventType.UploadProgress) {
          event.total;
          this.progress=Math.round((100*event.loaded)/event.total);
        } else if (event.type===HttpEventType.Response) {
          this.message="Uploaded success.";
          console.log(Error);
          this.onUploadFinished.emit(event.body);
        }
        console.log(event);
      })
  }
  onRemove(files: string){
    localStorage.removeItem(files);
  }

}
