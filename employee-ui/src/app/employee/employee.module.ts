import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { EmployeeService } from './employee.service';
import { HeaderComponent } from './shared/header/header.component';
import { CreateComponent } from './create/create.component';
import { EmployeeFormComponent } from './shared/employee-form/employee-form.component';


@NgModule({
  declarations: [
    EmployeeComponent,
    HeaderComponent,
    CreateComponent,
    EmployeeFormComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [EmployeeService]
})
export class EmployeeModule { }
