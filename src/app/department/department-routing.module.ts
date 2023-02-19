import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentCreationComponent } from './department-creation/department-creation.component';

const routes :Routes =[
  {path:'departmentList',component:DepartmentListComponent},
  {path:'departmentCreation',component:DepartmentCreationComponent},
  {path:'departmentEdit/:id',component:DepartmentCreationComponent},
  {path:'',redirectTo:'departmentList',pathMatch:'full'}
];

@NgModule({
  declarations: [
  ],
  imports: [

    RouterModule.forChild(routes),
  ],
  exports:[RouterModule]
})
export class DepartmentRoutingModule { }
