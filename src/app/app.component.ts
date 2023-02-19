import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { User } from './models/user.model';
import { AuthServiceService } from './services/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'addressBook';
  closeResult = '';

  isLoggedIn:boolean|undefined;

  user = new User();
  constructor(private authService: AuthServiceService
    , private route:ActivatedRoute,
    private router: Router) {

  }
  ngOnInit(): void {
   this.logged();
  }

    logged(){
      debugger
      if(localStorage.getItem('jwt')){
        this.isLoggedIn=true;
      }else{
        this.isLoggedIn=false;
    }
  }

  logout(){
    this.isLoggedIn=false;
    this.authService.logout();
  }

}


