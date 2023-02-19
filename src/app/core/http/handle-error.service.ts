import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  constructor() { }
  logError(error:HttpErrorResponse){
    if(error .error instanceof ErrorEvent){
      console.log("clientSide",error);
    }else{
      console.log("ServerSide",error);
    }
    return throwError("there is something went wrong");
  }
}
