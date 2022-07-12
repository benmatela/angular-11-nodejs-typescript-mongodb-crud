import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { EmployeeService } from './employee.service';
import { IEmployee } from '../employee/shared/models/interface/employee.interface';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { IResponseWrapper } from '../employee/shared/models/interface/response-wrapper.interface';
import { EmployeeModule } from './employee.module';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, EmployeeModule],
      providers: [EmployeeService, { provide: Router, useClass: RouterStub }],
    });

    injector = getTestBed();
    service = injector.inject(EmployeeService);
    httpMock = injector.inject(HttpTestingController);
  });

  const responseWrapper: IResponseWrapper<IEmployee[]> = {
    data: [
      {
        _id: 'KO0987',
        firstName: 'Johnny',
        lastName: 'Bravo',
        contactNumber: 630546017,
        dateOfBirth: '2022-07-12',
        emailAddress: 'matelaben@gmail.com',
        address:
          '{"streetAddress":"17 Bishop Road","city":"Cape Town","postalCode":7925,"country":"South Africa"}',
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
        emailAddress: 'matelaben@gmail.com',
        address:
          '{"streetAddress":"17 Bishop Road","city":"Cape Town","postalCode":7935,"country":"South Africa"}',
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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('list() should return data', async (done: any) => {
    service.list();
    service.employeesResponse.subscribe((res) => {
      if (res && res.data && res.data.length > 0) {
        expect(res.data).toEqual(responseWrapper.data);
      }
    });

    const req = httpMock.expectOne(environment.employeeAPI + '/list');
    expect(req.request.method).toBe('GET');
    req.flush(responseWrapper);
    done();
  });

  afterEach(() => {
    httpMock.verify();
  });
});

class RouterStub {
  url = 'employees';
  navigate(commands: any[], extras?: any) {}
}
