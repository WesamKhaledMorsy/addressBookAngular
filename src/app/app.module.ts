import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { JobComponent } from './job/job.component';
import { DepartmentComponent } from './department/department.component';
import { BookComponent } from './book/book.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BookListComponent } from './book/book-list/book-list.component';
import { JobListComponent } from './job/job-list/job-list.component';
import { JobCreationComponent } from './job/job-creation/job-creation.component';
import { DepartmentListComponent } from './department/department-list/department-list.component';
import { DepartmentCreationComponent } from './department/department-creation/department-creation.component';
import { BookCreationComponent } from './book/book-creation/book-creation.component';
import { CommonModule } from '@angular/common';
import { BookEditComponent } from './book/book-edit/book-edit.component';
import { DepartmentEditComponent } from './department/department-edit/department-edit.component';
import { JobEditComponent } from './job/job-edit/job-edit.component';
import { IdentityRevealedValidatDirective } from './identity-revealed-validat.directive';
import { ForbiddenValidatorDirectiveDirective } from './forbidden-validator-directive.directive';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { JwtModule } from '@auth0/angular-jwt';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthInterceptor } from './helpers/auth-interceptor';
// import { httpInterceptorProviders } from './helpers/auth-interceptor';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    JobComponent,
    DepartmentComponent,
    BookComponent,
    BookListComponent,
    BookCreationComponent,
    BookEditComponent,
    JobListComponent,
    JobCreationComponent,
    JobEditComponent,
    DepartmentListComponent,
    DepartmentCreationComponent,
    DepartmentEditComponent,
    IdentityRevealedValidatDirective,
    ForbiddenValidatorDirectiveDirective,

  ],

  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxDropzoneModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["example.com"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
    RouterModule,
    RouterTestingModule
  ],

  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true,
  }],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})

export class AppModule { }
