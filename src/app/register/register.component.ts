import { Component, Inject, Input } from '@angular/core';
import { User } from '../models/user.model';
import { AuthServiceService } from '../services/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = new User();
  submitted = false;
  error = '';
  successmsg = false;
  elem: any;

  signUpForm :FormGroup=this.formbuilder.group({
    userName:['',Validators.required,Validators.pattern('(.*[a-z].*)')],
    email:['',[Validators.required]],
    password:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
  })
  isUser: boolean=false;

  @Input() UserInput : User = new User();

  constructor(private authService: AuthServiceService
    ,private formbuilder:FormBuilder,
    private http:HttpClient,
    private router: Router,
    @Inject(DOCUMENT) private document: any) {
  }
  ngOnInit(): void {
    this.elem = document.documentElement;
    this.openFullscreen();
    this.signUpForm;
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.closeFullscreen();
  }
  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }
/* Close fullscreen */
  closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }

  get userName(){return this.signUpForm.get('userName') as FormControl;}
  get email() { return this.signUpForm.get('email') as FormControl; }

  get password(){return this.signUpForm.get('password') as FormControl;}

  get f() { return this.signUpForm.controls; }

  public reister(user:User):Observable<any>{
    return this.http.post<any>('https://localhost:7199/api/Auth/Register',user);
  }
  register (){
    if (this.signUpForm.invalid) {
      debugger

      return;
    } else {
      const body =new User();
      body.username=this.signUpForm.controls['userName'].value;
       body.email=this.signUpForm.controls['email'].value;
        body .password=this.signUpForm.controls['password'].value;
    debugger
    this.reister(body)
    .subscribe((data)=>{
      console.log("response",data);
      console.log(data.error)
      localStorage.setItem('jwt', data.tokens);
      localStorage.setItem('roles',data.roles);
      localStorage.setItem('userId',data.userId);
      localStorage.setItem('userName',data.username);
      debugger
      if(this.http.request<any>)
      {
        this.router.navigate(['/home']);
      }else if(data.tokens==null){
        //window.alert("This Email is exist");
        this.router.navigate(['/']);
      }
      else{
       console.log("error",this.error);
      }


     this.router.navigate(['/home']);
    })
    this.isUser=true;
  }

  }

  logout(){
    this.authService.logout();
    this.isUser=false;
    this.router.navigate(['/register']);
  }
}




