import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookListComponent } from './book-list/book-list.component';
import { BookCreationComponent } from './book-creation/book-creation.component';
import { RouterModule } from '@angular/router';
import { BookRoutingModule } from './book-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxDropzoneModule } from 'ngx-dropzone';



@NgModule({
  declarations: [
   // BookListComponent,
    //BookCreationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BookRoutingModule,
    HttpClientModule,
    NgxDropzoneModule
  ],
  exports: [RouterModule]
})
export class BookModule { }
