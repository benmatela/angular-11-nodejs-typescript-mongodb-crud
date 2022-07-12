import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { EmployeeComponent } from './employee.component';
import { EmployeeModule } from './employee.module';
import { EmployeeService } from './employee.service';
import { IEmployee } from './shared/models/interface/employee.interface';
import { IResponseWrapper } from './shared/models/interface/response-wrapper.interface';

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: EmployeeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeComponent],
      imports: [EmployeeModule, HttpClientTestingModule],
      providers: [EmployeeService],
    }).compileComponents();
    injector = getTestBed();
    service = injector.inject(EmployeeService);
    httpMock = injector.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  let responseWrapper: IResponseWrapper<IEmployee[]> = {
    data: [
      {
        _id: 'KO0987',
        firstName: 'Johnny',
        lastName: 'Bravo',
        contactNumber: 630546017,
        dateOfBirth: '2022-07-12',
        emailAddress: 'johny@gmail.com',
        address:
          '{"streetAddress":"40 Bishop Road","city":"Cape Town","postalCode":7925,"country":"South Africa"}',
        skills:
          '[{"skill":"C#","yearsOfExperience":4,"seniorityRating":"Intermediate"}]',
        createdAt: '2022-07-11T10:07:32.608Z',
        updatedAt: '2022-07-11T15:05:29.833Z',
        __v: 0,
      },
      {
        _id: 'RT0786',
        firstName: 'Chuck',
        lastName: 'Taylor',
        contactNumber: 630546017,
        dateOfBirth: '2022-07-12',
        emailAddress: 'chuck@gmail.com',
        address:
          '{"streetAddress":"57 Bishop Road","city":"Cape Town","postalCode":7935,"country":"South Africa"}',
        skills:
          '[{"skill":"Java","yearsOfExperience":3,"seniorityRating":"Intermediate"}]',
        createdAt: '2022-07-11T10:23:04.298Z',
        updatedAt: '2022-07-11T14:56:38.166Z',
        __v: 0,
      },
    ],
    success: false,
    error: '',
    status: 0,
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get a list of employees', async (done: any) => {
    service.employeesResponse.subscribe((res) => {
      if (res && res.data && res.data.length > 0) {
        expect(res.data).toEqual(responseWrapper.data);
        component.employees = res.data;
        component.loading = false;
        fixture.detectChanges();
      }
    });

    const req = httpMock.expectOne(environment.employeeAPI + '/list');
    expect(req.request.method).toBe('GET');
    req.flush(responseWrapper);
    done();
  });
});
