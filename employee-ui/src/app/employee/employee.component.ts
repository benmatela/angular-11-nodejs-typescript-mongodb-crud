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
  editMode: boolean = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.list();
    this.employeeService.employeesResponse.subscribe((res) => {
      if (res && res.status > 0) {
        this.employees = res.data;
        this.loading = false;
      }
    });
  }

  onUpdate(selectedEmployee: IEmployee) {
    if (selectedEmployee) {
      this.employeeService.setSelectedEmployee(selectedEmployee);
      this.editMode = true;
      this.openNav();
    }
  }

  openNav() {
    const nav = document.getElementById('sidenav');
    if (nav) {
      nav.style.width = '450px';
    }
  }

  closeNav() {
    this.editMode = false;
    const nav = document.getElementById('sidenav');
    if (nav) {
      nav.style.width = '0';
    }
  }
}
