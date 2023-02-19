import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobListComponent } from './job-list/job-list.component';
import { JobCreationComponent } from './job-creation/job-creation.component';
import { RouterModule } from '@angular/router';
import { JobRoutingModule } from './job-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { JobEditComponent } from './job-edit/job-edit.component';




@NgModule({
  declarations: [



  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    JobRoutingModule,
    HttpClientModule,


  ],
  //exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class JobModule { }
