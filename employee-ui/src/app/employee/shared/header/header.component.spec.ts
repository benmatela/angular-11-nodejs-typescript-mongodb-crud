import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

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

  it('should return empty employee list status', () => {
    const element: Element = fixture.debugElement.nativeElement.querySelector('p#noEmployeesStatusText');
    if (element) {
      const noEmployeesStatusText = element.innerHTML;
      expect(noEmployeesStatusText).toEqual('No Employees');
      expect(component.employees.length).toEqual(0);
    } else {
      expect(component.employees.length).toEqual(0);
    }
  });

  it('should return employee list status', () => {
    const element: Element = fixture.debugElement.nativeElement.querySelector('p#employeesStatusText');
    if (element) {
      const employeesStatusText = element.innerHTML;
      expect(employeesStatusText).toEqual('There are 2 employees');
      expect(component.employees.length).toEqual(2);
    } else {
      expect(component.employees.length).toEqual(0);
    }
  });

  it('should open side nav when clicking new employee button', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const onClickMock = spyOn(component, 'openNav');
      fixture.debugElement.query(By.css('#newEmployeeBtn')).triggerEventHandler('click', null);
      expect(onClickMock).toHaveBeenCalled();
      const element: Element = fixture.debugElement.nativeElement.querySelector('div#sidenav');
      expect(element.clientWidth).toEqual(450);
    });
  });

});
