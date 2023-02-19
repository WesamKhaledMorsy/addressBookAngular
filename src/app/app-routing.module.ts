import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { JobComponent } from './job/job.component';
import { BookComponent } from './book/book.component';
import { JobListComponent } from './job/job-list/job-list.component';
import { JobCreationComponent } from './job/job-creation/job-creation.component';
import { BookListComponent } from './book/book-list/book-list.component';
import { BookCreationComponent } from './book/book-creation/book-creation.component';
import { DepartmentComponent } from './department/department.component';
import { DepartmentListComponent } from './department/department-list/department-list.component';
import { DepartmentCreationComponent } from './department/department-creation/department-creation.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BookEditComponent } from './book/book-edit/book-edit.component';
import { DepartmentEditComponent } from './department/department-edit/department-edit.component';
import { JobEditComponent } from './job/job-edit/job-edit.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  // {path:'job', loadChildren: () => import('./job/job.module').then(m => m.JobModule) },
  // {path:'book',loadChildren:()=>import('./book/book.module').then(m=>m.BookModule)},
  // {path:'department',loadChildren:()=>import('./department/department.module').then(m=>m.DepartmentModule)},
  {path:'job',component:JobComponent,
    children:[
    {path:'jobList',component:JobListComponent},
    {path:'jobCreation',component:JobCreationComponent},
   {path:'jobEdit/:id',component:JobCreationComponent},
    {path:'',redirectTo:'jobList',pathMatch:'full'}
]},
  {path:'book',component:BookComponent,children:[
    {path:'bookList',component:BookListComponent},
    {path:'bookCreation',component:BookCreationComponent},
   {path:'bookEdit/:id',component:BookCreationComponent},
    {path:'',redirectTo:'bookList',pathMatch:'full'}
  ]},
  {path:'department', component:DepartmentComponent,children:[
    {path:'departmentList',component:DepartmentListComponent},
    {path:'departmentCreation',component:DepartmentCreationComponent},
   {path:'departmentEdit/:id',component:DepartmentCreationComponent},
    {path:'',redirectTo:'departmentList',pathMatch:'full'}
  ]},
  {path:'**', component:NotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
