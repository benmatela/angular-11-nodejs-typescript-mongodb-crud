import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
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

});
