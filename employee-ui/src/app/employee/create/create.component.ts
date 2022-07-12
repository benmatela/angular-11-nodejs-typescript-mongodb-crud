import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  template: `<app-employee-form
    [pageName]="pageName"
    [formGroup]="createEmployeeForm"
  ></app-employee-form>`,
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  pageName: string = 'New Employee';
  createEmployeeForm = {} as FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createEmployeeForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      contactNumber: [null, [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{9}$')]],
      email: [null, [Validators.email, Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      address: this.fb.group({
        streetAddress: [null, Validators.required],
        city: [null, Validators.required],
        postalCode: [null, Validators.required],
        country: [null, Validators.required],
      }),
      skills: new FormArray([], Validators.required),
    });
  }
}
