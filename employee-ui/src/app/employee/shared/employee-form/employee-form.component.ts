import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { EmployeeService } from '../../employee.service';
import { IEmployee } from '../models/interface/employee.interface';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit {
  @Input() formGroup = {} as FormGroup;
  @Input() pageName: string = '';
  @Input() editMode: boolean = false;

  selectedEmployee = {} as IEmployee;
  faTrash = faTrash;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeService.selectedEmployee.subscribe((res) => {
      if (res && res._id) {
        this.selectedEmployee = res;
      }
    });
    if (!this.editMode) {
      this.skills.push(this.createSkill());
    }
  }

  get formGroupControls(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  get skills(): FormArray {
    return <FormArray>this.formGroup.get('skills');
  }

  get address(): FormGroup {
    return <FormGroup>this.formGroup.get('address');
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
   * @returns boolean
   */
  public skillHasError = (group: any, controlName: string, errorName: string): boolean => {
    return (
      group.controls[controlName].hasError(errorName) &&
      group.controls[controlName].touched
    );
  };

  createSkill(): FormGroup {
    return this.fb.group({
      skill: ['', Validators.required],
      yearsOfExperience: ['', Validators.required],
      seniorityRating: ['', Validators.required],
    });
  }

  /**
   * Check Skills FormArray validation.
   * @param $event 
   */
  onSkillValueChange($event: any) {
    this.skills.updateValueAndValidity()
  }

  onAddNewSkill() {
    this.skills.controls.push(this.createSkill());
    this.skills.updateValueAndValidity()
  }

  onRemoveSkill(index: number) {
    this.skills.controls.splice(index, 1);
    this.formGroup.controls['skills'].value.splice(index, 1);
    this.skills.updateValueAndValidity()
  }

  onCreateNewEmployee() {
    if (!this.formGroup.invalid) {
      const formValue = this.formGroup.value;
      const newEmployee = {} as IEmployee;
      newEmployee.firstName = String(formValue.firstName);
      newEmployee.lastName = String(formValue.lastName);
      newEmployee.contactNumber = Number(formValue.contactNumber);
      newEmployee.dateOfBirth = String(formValue.dateOfBirth);
      newEmployee.emailAddress = String(formValue.email);
      newEmployee.address = JSON.stringify(formValue.address);
      newEmployee.skills = JSON.stringify(formValue.skills);

      this.employeeService.create(newEmployee);
      this.formGroup.reset();
    }
  }

  onUpdateEmployee() {
    if (!this.formGroup.invalid) {
      const formValue = this.formGroup.value;
      const employeeToUpdate = {} as IEmployee;
      employeeToUpdate._id = this.selectedEmployee._id;
      employeeToUpdate.firstName = String(formValue.firstName);
      employeeToUpdate.lastName = String(formValue.lastName);
      employeeToUpdate.contactNumber = Number(formValue.contactNumber);
      employeeToUpdate.dateOfBirth = String(formValue.dateOfBirth);
      employeeToUpdate.emailAddress = String(formValue.email);
      employeeToUpdate.address = JSON.stringify(formValue.address);
      employeeToUpdate.skills = JSON.stringify(formValue.skills);

      this.employeeService.update(employeeToUpdate);
      this.formGroup.reset();
      this.closeNav();
    }
  }

  closeNav() {
    const nav = document.getElementById('sidenav');
    if (nav) {
      nav.style.width = '0';
    }
  }
}
