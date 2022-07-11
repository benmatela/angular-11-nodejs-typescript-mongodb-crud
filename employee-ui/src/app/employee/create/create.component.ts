import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
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
      contactNumber: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: [null, [Validators.email, Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      address: this.fb.group({
        streetAddress: [null, Validators.required],
        city: [null, Validators.required],
        postalCode: [null, Validators.required],
        country: [null, Validators.required],
      }),
      skills: new FormArray([this.createSkill()], Validators.required)
    });

    this.skills.controls.forEach(res => {
      console.log(res.value);
    });
  }

  createSkill(): FormGroup {
    return this.fb.group({
      skill: [null, Validators.required],
      yearsOfExperience: [null, Validators.required],
      seniorityRating: [null, Validators.required]
    })
  }

  addSkill() {
    this.skills.controls.push(this.createSkill());
  }

  get skills(): FormArray {
    return <FormArray> this.createEmployeeForm.get('skills');
  }

  /**
   * Get form controls
   */
  get f(): { [key: string]: AbstractControl } {
    return this.createEmployeeForm.controls;
  }

}
