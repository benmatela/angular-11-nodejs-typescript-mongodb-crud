import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { IAddress } from '../shared/models/interface/address.interface';
import { IEmployee } from '../shared/models/interface/employee.interface';
import { ISkill } from '../shared/models/interface/skill.interface';

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
  selectedEmployee = {} as IEmployee;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.selectedEmployee.subscribe(res => {
      if (res && res._id) {
        this.selectedEmployee = res;
        this.updateEmployeeForm = this.fb.group({
          firstName: [this.selectedEmployee.firstName, [Validators.required]],
          lastName: [this.selectedEmployee.lastName, [Validators.required]],
          contactNumber: [this.selectedEmployee.contactNumber, [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{9}$')]],
          email: [this.selectedEmployee.emailAddress, [Validators.email, Validators.required]],
          dateOfBirth: [this.selectedEmployee.dateOfBirth, [Validators.required]],
          address: this.fb.group({
            streetAddress: [this.address.streetAddress, Validators.required],
            city: [this.address.city, Validators.required],
            postalCode: [this.address.postalCode, Validators.required],
            country: [this.address.country, Validators.required],
          }),
          skills: new FormArray([], Validators.required),
        });
        this.populateSkillsFormArray();
      }
    });
  }

  get address(): IAddress {
    return JSON.parse(this.selectedEmployee.address);
  }

  get skills(): FormArray {
    return <FormArray> this.updateEmployeeForm.get('skills');
  }

  /**
   * Converts Skills from a string to an array.
   * Uses the array result to populate the Skills FormArray. 
   * @returns void
   */
   populateSkillsFormArray() {
    const skillList: ISkill[] = JSON.parse(this.selectedEmployee.skills);
    for (let index = 0; index < skillList.length; index++) {
      const s = skillList[index];
      this.skills.controls.push(new FormControl())
      this.skills.setControl(index, this.createSkill(s.skill, s.yearsOfExpirience || 0, s.seniorityRating))
    }
  }

  /**
   * Populates a new Skill FormGroup
   * @param skill 
   * @param yearsOfExperience 
   * @param seniorityRating 
   * @returns FormGroup
   */
  createSkill(skill: string, yearsOfExperience: number, seniorityRating: string): FormGroup {
    return this.fb.group({
      skill: [skill, Validators.required],
      yearsOfExperience: [yearsOfExperience, Validators.required],
      seniorityRating: [seniorityRating, Validators.required]
    });
  }
}
