import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { IEmployee } from './shared/models/interface/employee.interface';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  employees: IEmployee[] = [];
  loading: boolean = true;
  logoUrl: string = 'assets/Icon.JPG';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.findAll();
    this.employeeService.employeesResponse.subscribe((res) => {
      if (res && res.status > 0) {
        this.employees = res.data;
        this.loading = false;
      }
    });
  }

  closeNav() {
    const nav = document.getElementById('sidenav');
    if (nav) {
      nav.style.width = '0';
    }
  }
}
