import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Job } from './job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http:HttpClient) { }

  public getJobById(id:string) : Observable <any>{
    // const headers = new HttpHeaders({
    //   Authorization :`Bearer ${localStorage.getItem('jwt')}`,
    // });
    let url='https://localhost:7199/api/Job/GetJobById';
    if (id!="")
      url += `?id=${id}`

    return this.http.get<Job>(
      url);
    //   ,{headers:headers}
    // );
  }

  public UpdateJob(job: Job): Observable<Job> {
    // const headers = new HttpHeaders({
    //   Authorization :`Bearer ${localStorage.getItem('jwt')}`,
    // });
    debugger
    return this.http.put<Job>(
      'https://localhost:7199/api/JOb/EditJob',
      job);
    //   ,{headers:headers}
    // );
  }

}
