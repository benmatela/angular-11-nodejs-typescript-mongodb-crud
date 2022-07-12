import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { EmployeeModule } from '../employee.module';
import { EmployeeService } from '../employee.service';

import { UpdateComponent } from './update.component';

describe('UpdateComponent', () => {
  let component: UpdateComponent;
  let fixture: ComponentFixture<UpdateComponent>;
  let service: EmployeeService;
  let injector: TestBed;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateComponent],
      imports: [EmployeeModule],
      providers: [EmployeeService]
    })
    .compileComponents();
    injector = getTestBed();
    service = injector.inject(EmployeeService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateComponent);
    component = fixture.componentInstance;
    service = injector.inject(EmployeeService);
    fixture.detectChanges();
  });

  const selectedEmployee = {
    _id: 'KY8293',
    firstName: 'Jane',
    lastName: 'Doe Bravo',
    contactNumber: 630546017,
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

});
