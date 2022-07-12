import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateComponent } from './create/create.component';

import { EmployeeComponent } from './employee.component';
import { EmployeeModule } from './employee.module';
import { EmployeeService } from './employee.service';
import { EmployeeFormComponent } from './shared/employee-form/employee-form.component';
import { HeaderComponent } from './shared/header/header.component';
import { UpdateComponent } from './update/update.component';

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        EmployeeModule
      ],
      providers: [EmployeeService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
