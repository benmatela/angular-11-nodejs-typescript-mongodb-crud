import { Component, Input, OnInit } from '@angular/core';
import { IEmployee } from '../models/interface/employee.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() employees: IEmployee[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
