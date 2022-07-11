import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  @Input() formGroup = {} as FormGroup;
  @Input() pageName: string = '';
  @Input() editMode: boolean = false;
  faTrash = faTrash;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (!this.editMode) {
      this.skills.push(this.createSkill());
    }
  }

  get formGroupControls(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  get skills(): FormArray {
    return <FormArray> this.formGroup.get('skills');
  }

  get address(): FormGroup {
    return <FormGroup> this.formGroup.get('address');
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

  onRemoveSkill(index: number) {
    this.skills.controls.splice(index, 1);
  }

}
