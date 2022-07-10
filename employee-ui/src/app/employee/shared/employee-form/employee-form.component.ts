import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent {
  @Input() formGroup = {} as FormGroup;
  @Input() pageName: string = '';
  @Input() editMode: boolean = false;


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
  public hasError = (controlName: string, errorName: string): boolean => {
    return (
      this.formGroup.controls[controlName].hasError(errorName) &&
      this.formGroup.controls[controlName].touched
    );
  };
  
}
