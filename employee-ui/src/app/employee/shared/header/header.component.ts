import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEmployee } from '../models/interface/employee.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() searchResultEvent = new EventEmitter<IEmployee[]>();
  @Input() employees: IEmployee[] = [];
  @Input() employeeStore: IEmployee[] = [];
  searchItem: string = '';

  openNav() {
    const nav = document.getElementById('sidenav');
    if (nav) {
      nav.style.width = '450px';
    }
  }

  /**
   * Search and emit result to employees component.
   */
  onSearch() {
    this.employees = this.employeeStore.filter((r) => {
      return (
        r.firstName.toLowerCase().includes(this.searchItem.toLowerCase()) ||
        r.lastName.toLowerCase().includes(this.searchItem.toLowerCase()) ||
        r.emailAddress.toLowerCase().includes(this.searchItem.toLowerCase())
      );
    });

    if (this.searchItem === '') {
      this.employees = this.employeeStore;
    }
    this.searchResultEvent.emit(this.employees);
  }

}
