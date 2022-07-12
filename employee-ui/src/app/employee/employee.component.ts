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
  employeeStore: IEmployee[] = [];
  loading: boolean = true;
  noEmployeesImgUrl: string = 'assets/Icon.JPG';
  editMode: boolean = false;

  constructor(public employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.list();
    this.employeeService.employeesResponse.subscribe((res) => {
      if (res && res.status > 0) {
        this.employees = res.data;
        this.employeeStore = res.data;
        this.loading = false;
      }
    });
  }

  /**
   * Get search result from the header component.
   * @param searchResult 
   */
  receiveSearchResult(searchResult: IEmployee[]) {
    this.employees = searchResult;
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
