import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { EmployeeComponent } from './employee.component';
import { EmployeeModule } from './employee.module';
import { IEmployee } from './shared/models/interface/employee.interface';
import { IResponseWrapper } from './shared/models/interface/response-wrapper.interface';

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeComponent],
      imports: [EmployeeModule, HttpClientTestingModule]
    }).compileComponents();
    injector = getTestBed();
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

  it('should get and display a list of employees', async (done: any) => {
    component.employeeService.employeesResponse.subscribe((res) => {
      if (res && res.data && res.data.length > 0) {
        component.employees = res.data;
        component.loading = false;
        component.employeeStore = component.employees;
        
        fixture.detectChanges();
        const employeeList = fixture.debugElement.queryAll(By.css('li#employee'));
        expect(component.employees.length).toEqual(2);
        expect(employeeList.length).toEqual(2);

        const req = httpMock.expectOne(environment.employeeAPI + '/list');
        expect(req.request.method).toBe('GET');
        req.flush(responseWrapper);
      }
    });
    done();
  });

  it('should open side nav when calling openNav()', () => {
    component.openNav();
    fixture.detectChanges();
    const element: Element = fixture.debugElement.nativeElement.querySelector('div#sidenav');
    expect(element.clientWidth).toEqual(450);

    const createForm = fixture.debugElement.query(By.css('#createForm'));
    expect(createForm).toBeTruthy();

    const employeeForm = fixture.debugElement.query(By.css('#employeeForm'));
    expect(employeeForm).toBeTruthy();

    let firstNameElement = fixture.debugElement.query(By.css('#firstName'));
    let firstName = firstNameElement.nativeElement;
    expect(firstName).toBeTruthy();
    expect(firstName.value).toBe('');
  });

  it('should close side nav when calling closeNav()', () => {
    component.closeNav();
    fixture.detectChanges();
    const element: Element = fixture.debugElement.nativeElement.querySelector('div#sidenav');
    expect(element.clientWidth).toEqual(0);
  });

  it('should close side nav when clicking close nav button', () => {
    const onClickMock = spyOn(component, 'closeNav');
    fixture.debugElement.query(By.css('.close-btn')).triggerEventHandler('click', null);
    fixture.whenStable().then(() => {
      expect(onClickMock).toHaveBeenCalled();

      fixture.detectChanges();
      const element: Element = fixture.debugElement.nativeElement.querySelector('div#sidenav');
      expect(element.clientWidth).toEqual(0);
    });
  });

  it('should open side nav with populated updateForm fields when clicking on the employee', () => {
    component.onUpdate(responseWrapper.data[0]);
    component.openNav();
    fixture.detectChanges();
    const element: Element = fixture.debugElement.nativeElement.querySelector('div#sidenav');
    expect(element.clientWidth).toEqual(450);

    const updateComponent: Element = fixture.debugElement.nativeElement.querySelector('#updateForm');
    expect(updateComponent).toBeTruthy();

    const employeeForm: Element = fixture.debugElement.nativeElement.querySelector('#employeeForm');
    expect(employeeForm).toBeTruthy();
    
    let firstNameElement = fixture.debugElement.query(By.css('#firstName'));
    let firstName = firstNameElement.nativeElement;
    expect(firstName).toBeTruthy();
    expect(firstName.value).toBe('Johnny');
  });

});
