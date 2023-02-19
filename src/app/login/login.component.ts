import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../services/auth-service.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/internal/Observable';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  user = new User();
  submitted = false;
  error = '';
  successmsg = false;

  elem: any;

  LoginForm :FormGroup=this.formbuilder.group({
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
    this.LoginForm;
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

  get email() { return this.LoginForm.get('email') as FormControl; }

  get password(){return this.LoginForm.get('password') as FormControl;}

  get f() { return this.LoginForm.controls; }

  public reister(user:User):Observable<any>{
    return this.http.post<any>('https://localhost:7199/api/Auth/Login',user);
  }
  Login (){
    if (this.LoginForm.invalid) {
      debugger

      return;
    } else {
      const body =new User();

       body.email=this.LoginForm.controls['email'].value;
        body .password=this.LoginForm.controls['password'].value;
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
