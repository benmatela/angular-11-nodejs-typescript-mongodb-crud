import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return no employees status', () => {
    const element: Element = fixture.debugElement.nativeElement.querySelector('p#noEmployeesStatusText');
    if (element) {
      const noEmployeesStatusText = element.innerHTML;
      expect(noEmployeesStatusText).toEqual('No Employees');
      expect(component.employees.length).toEqual(0);
    } else {
      expect(component.employees.length).toEqual(0);
    }
  });

  it('should return employees status', () => {
    const element: Element = fixture.debugElement.nativeElement.querySelector('p#employeesStatusText');
    if (element) {
      const employeesStatusText = element.innerHTML;
      expect(employeesStatusText).toEqual('There are 2 employees');
      expect(component.employees.length).toEqual(2);
    } else {
      expect(component.employees.length).toEqual(0);
    }
  });

});
