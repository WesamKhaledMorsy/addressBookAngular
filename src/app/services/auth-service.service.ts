import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient, private router: Router) { }

  public reister(user:User):Observable<any>{
    return this.http.post<any>('https://localhost:7199/api/Auth/Register',user);
  }

  public login(user:User):Observable<string>{
    return this.http.post('https://localhost:7199/api/Auth/Login',
    user,
    {responseType:'text'},
    );
  }
  public logout(){
    localStorage.clear();
    this.router.navigate(['/home']);
  }
// login(email:string, password:string ) {
//   // return this.http.post<User>('https://localhost:7199/api/Auth/Login', {email, password})
//   //     .subscribe(res => this.setSession) ;
//       // .shareReplay();
// }

// private setSession(authResult) {
//   const expiresAt = moment().add(authResult.expiresIn,'second');

//   localStorage.setItem('id_token', authResult.idToken);
//   localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
// }

// logout() {
//   localStorage.removeItem("id_token");
//   localStorage.removeItem("expires_at");
// }

// public isLoggedIn() {
//   return moment().isBefore(this.getExpiration());
// }

// isLoggedOut() {
//   return !this.isLoggedIn();
// }

// getExpiration() {
//   const expiration = localStorage.getItem("expires_at");
//   const expiresAt = JSON.parse(expiration);
//   return moment(expiresAt);
// }


// login(username: string, password: string): Observable<any> {
//   return this.http.post(
//     AUTH_API + 'signin',
//     {
//       username,
//       password,
//     },
//     httpOptions
//   );
// }

// register(username: string, email: string, password: string): Observable<any> {
//   return this.http.post(
//     AUTH_API + 'signup',
//     {
//       username,
//       email,
//       password,
//     },
//     httpOptions
//   );
// }

// logout(): Observable<any> {
//   return this.http.post(AUTH_API + 'signout', { }, httpOptions);
// }
}

