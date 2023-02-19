import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookCreationComponent } from './book-creation/book-creation.component';
import { BookEditComponent } from './book-edit/book-edit.component';

const routes :Routes =[
  {path:'bookList',component:BookListComponent},
  {path:'bookCreation',component:BookCreationComponent},
  {path:'bookEdit/:id',component:BookEditComponent},
  {path:'',redirectTo:'bookList',pathMatch:'full'}
];

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class BookRoutingModule { }
