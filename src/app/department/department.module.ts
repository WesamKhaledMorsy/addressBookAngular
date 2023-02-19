import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentListComponent } from './department-list/department-list.component';
import { RouterModule } from '@angular/router';
import { DepartmentCreationComponent } from './department-creation/department-creation.component';
import { DepartmentRoutingModule } from './department-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DepartmentEditComponent } from './department-edit/department-edit.component';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DepartmentRoutingModule,
    HttpClientModule,

  ],
  exports: [
    //RouterModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class DepartmentModule { }
