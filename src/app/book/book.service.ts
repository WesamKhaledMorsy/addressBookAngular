import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Book } from './book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpClient) { }

  public getBookById(id:string) : Observable <any>{
    // const headers = new HttpHeaders({
    //   Authorization :`Bearer ${localStorage.getItem('jwt')}`,
    // });
    let url='https://localhost:7199/api/Book/GetBookById';
    if (id!="")
      url += `?id=${id}`

    return this.http.get<Book>(
      url);
    //   ,{headers:headers}
    // );
  }

  public UpdateBook(book: Book): Observable<Book[]> {
    // const headers = new HttpHeaders({
    //   Authorization :`Bearer ${localStorage.getItem('jwt')}`,
    // });
    return this.http.put<Book[]>(
      `https://localhost:7199/api/Book/EditBook`,
      book);
    //   ,{headers:headers}
    // );
  }

}
