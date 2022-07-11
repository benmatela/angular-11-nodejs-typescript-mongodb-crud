import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  @Input() formGroup = {} as FormGroup;
  @Input() pageName: string = '';
  @Input() editMode: boolean = false;
  addressFormGroup: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const address = this.formGroup.get('address');
    if (address) {
      this.addressFormGroup = address;
    }
  
    if (!this.editMode) {
      this.skills.push(this.createSkill());
    }
  }

  /**
   * Get form controls
   */
   get f(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  /**
   * Checks for control errors
   * @param controlName 
   * @param errorName 
   * @returns boolean
   */
  public hasError = (formGroupName: FormGroup, controlName: string, errorName: string): boolean => {
    return (
      formGroupName.controls[controlName].hasError(errorName) &&
      formGroupName.controls[controlName].touched
    );
  };

  /**
   * Checks for control errors on skills array
   * @param index 
   * @param controlName 
   * @param errorName 
   * @returns 
   */
  public skillHasError = (group: any, controlName: string, errorName: string): boolean => {
    return (
      group.controls[controlName].hasError(errorName) &&
      group.controls[controlName].touched
    );
  };

  get skills(): FormArray{
    return <FormArray> this.formGroup.get('skills');
  }

  createSkill(): FormGroup {
    return this.fb.group({
      skill: [null, Validators.required],
      yearsOfExperience: [null, Validators.required],
      seniorityRating: [null, Validators.required]
    })
  }

  onAddNewSkill() {
    this.skills.controls.push(this.createSkill());
  }

}
