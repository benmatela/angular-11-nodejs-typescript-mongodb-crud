import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EmployeeModule } from '../employee.module';

import { CreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateComponent],
      imports: [EmployeeModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create empty form', () => {
    expect(component.createEmployeeForm.invalid).toEqual(true);
    
    let skillsElement = fixture.debugElement.query(By.css('#formGroup0'));
    let skills = skillsElement.nativeElement;
    expect(skills).toBeTruthy();
  });
});
