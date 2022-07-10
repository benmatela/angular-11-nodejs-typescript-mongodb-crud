import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

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
  skillFormGroup: any;

  ngOnInit(): void {
    const address = this.formGroup.get('address');
    if (address) {
      this.addressFormGroup = address;
    }
    const skills = this.formGroup.get('skills');
    if (address) {
      this.skillFormGroup = skills;
    }

    console.log(this.skillFormGroup);
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

}
