import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent {
  @Input() formGroup = {} as FormGroup;
  @Input() pageName: string = '';
  @Input() editMode: boolean = false;
}
