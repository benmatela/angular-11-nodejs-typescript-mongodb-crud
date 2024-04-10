import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { EmployeeService } from './employee.service';
import { IEmployee } from '../employee/shared/models/interface/employee.interface';
import { environment } from 'src/environments/environment';
import { IResponseWrapper } from '../employee/shared/models/interface/response-wrapper.interface';
import { EmployeeModule } from './employee.module';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, EmployeeModule],
      providers: [EmployeeService],
    });

    injector = getTestBed();
    service = injector.inject(EmployeeService);
    httpMock = injector.inject(HttpTestingController);
  });

  let responseWrapper: IResponseWrapper<IEmployee[]> = {
    data: [
      {
        _id: 'KO0987',
        firstName: 'Johnny',
        lastName: 'Bravo',
        contactNumber: 6455345345,
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
        contactNumber: 34534534,
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
    expect(service).toBeTruthy();
  });

  it('list() should return a list of employees', async (done: any) => {
    service.list();
    service.employeesResponse.subscribe((res) => {
      if (res && res.data && res.data.length > 0) {
        expect(res.data).toEqual(responseWrapper.data);
        expect(res.data.length).toEqual(2);
      }
    });

    const req = httpMock.expectOne(environment.employeeAPI + '/list');
    expect(req.request.method).toBe('GET');
    req.flush(responseWrapper);
    done();
  });

  it('create() should create new employee and return a list of employees', async (done: any) => {
    const newEmployee = {
      _id: 'KY8293',
      firstName: 'Jane',
      lastName: 'Doe',
      contactNumber: 56343543,
      dateOfBirth: '2022-07-12',
      emailAddress: 'jane@gmail.com',
      address:
        '{"streetAddress":"40 Bishop Road","city":"Cape Town","postalCode":7925,"country":"South Africa"}',
      skills:
        '[{"skill":"C#","yearsOfExperience":4,"seniorityRating":"Intermediate"}]',
      createdAt: '2022-07-11T10:07:32.608Z',
      updatedAt: '2022-07-11T15:05:29.833Z',
      __v: 0,
    }

    service.create(newEmployee);
    service.employeesResponse.subscribe((res) => {
      if (res && res.data && res.data.length > 0) {
        responseWrapper = res;
        expect(res.data.length).toEqual(3);
      }
    });

    const req = httpMock.expectOne(environment.employeeAPI + '/create');
    expect(req.request.method).toBe('POST');
    req.flush(responseWrapper);
    done();
  });

  it('update() should update existing employee lastname and return a list of employees', async (done: any) => {
    const employeeToUpdate = {
      _id: 'KY8293',
      firstName: 'Jane',
      lastName: 'Doe Bravo',
      contactNumber: 5634564563,
      dateOfBirth: '2022-07-12',
      emailAddress: 'jane@gmail.com',
      address:
        '{"streetAddress":"30 Bishop Park","city":"Cape Town","postalCode":7925,"country":"South Africa"}',
      skills:
        '[{"skill":"C#","yearsOfExperience":4,"seniorityRating":"Intermediate"}]',
      createdAt: '2022-07-11T10:07:32.608Z',
      updatedAt: '2022-07-11T15:05:29.833Z',
      __v: 0,
    }

    service.update(employeeToUpdate);
    service.employeesResponse.subscribe((res) => {
      if (res && res.data && res.data.length > 0) {
        responseWrapper = res;
        const updatedEmployee = responseWrapper.data.find(e => e._id === employeeToUpdate._id);
        expect(res.data.length).toEqual(3);
        expect(updatedEmployee?.lastName).toEqual('Doe Bravo');
        expect(updatedEmployee).not.toEqual(employeeToUpdate);
      }
    });

    const req = httpMock.expectOne(environment.employeeAPI + '/update');
    expect(req.request.method).toBe('PUT');
    req.flush(responseWrapper);
    done();
  });

  it('remove() should remove employee by ID and return a list of employees', async (done: any) => {
    const employeeToDeleteID = 'KY8293';

    service.remove(employeeToDeleteID);
    service.employeesResponse.subscribe((res) => {
      if (res && res.data && res.data.length > 0) {
        responseWrapper = res;
        const deletedEmployee = responseWrapper.data.find(e => e._id === employeeToDeleteID);
        expect(res.data.length).toEqual(2);
        expect(deletedEmployee).toEqual(undefined);
      }
    });

    const req = httpMock.expectOne(environment.employeeAPI + `/remove?employeeId=${employeeToDeleteID}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(responseWrapper);
    done();
  });

  afterEach(() => {
    httpMock.verify();
  });
});


