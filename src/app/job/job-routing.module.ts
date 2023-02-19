import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { JobListComponent } from './job-list/job-list.component';
import { JobCreationComponent } from './job-creation/job-creation.component';
import { BrowserModule } from '@angular/platform-browser';


const routes :Routes =[
  {path:'jobList',component:JobListComponent},
  {path:'jobCreation',component:JobCreationComponent},
  {path:'jobEdit',component:JobCreationComponent},
  {path:'',redirectTo:'jobList',pathMatch:'full'}
];
@NgModule({
  declarations: [],
  imports: [

    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class JobRoutingModule { }
