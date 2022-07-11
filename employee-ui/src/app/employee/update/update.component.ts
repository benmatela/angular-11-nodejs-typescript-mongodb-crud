import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-update',
  template: `<app-employee-form
    [editMode]="true"
    [pageName]="pageName"
    [formGroup]="updateEmployeeForm"
  ></app-employee-form>`,
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
  pageName: string = 'Edit Employee';
  updateEmployeeForm = {} as FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.updateEmployeeForm = this.fb.group({
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
