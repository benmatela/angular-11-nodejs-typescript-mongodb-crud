import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { IEmployee } from './models/interface/employee.interface';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  employees: IEmployee[] = [];

  loading: boolean = true;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.findAll();
    this.employeeService.employeesResponse.subscribe(res => {
      if (res && res.status > 0) {
        this.employees = res.data;
        this.loading = false;
      }
    });
  }
}
