import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { IEmployee } from './shared/models/interface/employee.interface';
import { IResponseWrapper } from './shared/models/interface/response-wrapper.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService implements OnDestroy {
  private readonly baseUrl = environment.employeeAPI;
  errorMessage: string = '';

  // Employee list store
  private employeesResponse$ = new BehaviorSubject<IResponseWrapper<IEmployee[]>>({
    data: [],
    success: false,
    error: '',
    status: 0,
  });
  private employeesResponseStore: { response: IResponseWrapper<IEmployee[]> } = {
    response: {
      data: [],
      success: false,
      error: '',
      status: 0,
    },
  };
  public readonly employeesResponse = this.employeesResponse$.asObservable();

  // Selected Employee store
  private selectedEmployee$ = new BehaviorSubject<IEmployee>({} as IEmployee);
  private selectedEmployeeStore: { selectedEmployee: IEmployee } = {
    selectedEmployee: {} as IEmployee
  };
  public readonly selectedEmployee = this.selectedEmployee$.asObservable();

  constructor(private httpClient: HttpClient) {}

  /**
   * Keeps track of all Employees.
   * @param response 
   * @returns void
   */
  setEmployeesResponse(response: IResponseWrapper<IEmployee[]>): void {
    this.employeesResponseStore.response = response;
    this.employeesResponse$.next(response);
  }

  /**
   * Keeps track of the selected Employee
   * @param selectedEmployee 
   * @returns void
   */
  public setSelectedEmployee(selectedEmployee: IEmployee): void {
    this.selectedEmployeeStore.selectedEmployee = selectedEmployee;
    this.selectedEmployee$.next(selectedEmployee);
  }

  /**
   * Gets a list of all available Employees.
   * 
   * The result is stored in employeesResponse.
   * @returns void
   */
  list(): void {
    this.httpClient
      .get<IResponseWrapper<IEmployee[]>>(this.baseUrl + '/list', {})
      .pipe(
        catchError((error) => {
          if (error.error instanceof ErrorEvent) {
            this.errorMessage = `Error: ${error.error.message}`;
          } else {
            this.errorMessage = this.getServerErrorMessage(error);
          }
          throw new Error(this.errorMessage);
        })
      )
      .subscribe(res => {
        this.setEmployeesResponse(res);
      });
  }

  /**
   * Creates a new Employee.
   * 
   * Updates employeesResponse on success.
   * @param employee 
   * @returns void
   */
  create(employee: IEmployee): void {
    this.httpClient
      .post<IResponseWrapper<IEmployee[]>>(this.baseUrl + '/create', employee)
      .pipe(
        catchError((error) => {
          if (error.error instanceof ErrorEvent) {
            this.errorMessage = `Error: ${error.error.message}`;
          } else {
            this.errorMessage = this.getServerErrorMessage(error);
          }
          throw new Error(this.errorMessage);
        })
      )
      .subscribe(res => {
        if (res.success) {
          this.list();
        }
      });
  }

  /**
   * Updates an existing employee
   * 
   * Updates employeesResponse on success.
   * @param employee 
   * @returns void
   */
  update(employee: IEmployee): void {
    this.httpClient
      .put<IResponseWrapper<IEmployee>>(this.baseUrl + '/update', employee)
      .pipe(
        catchError((error) => {
          if (error.error instanceof ErrorEvent) {
            this.errorMessage = `Error: ${error.error.message}`;
          } else {
            this.errorMessage = this.getServerErrorMessage(error);
          }
          throw new Error(this.errorMessage);
        })
      )
      .subscribe(res => {
        if (res.success) {
          this.list();
        }
      });
  }

  /**
   * Remove an employee by ID
   * @param employeeId 
   * @returns void
   */
  remove(employeeId: string): void {
    this.httpClient
      .delete<IResponseWrapper<IEmployee>>(`${this.baseUrl}/remove?employeeId=${employeeId}`)
      .pipe(
        catchError((error) => {
          if (error.error instanceof ErrorEvent) {
            this.errorMessage = `Error: ${error.error.message}`;
          } else {
            this.errorMessage = this.getServerErrorMessage(error);
          }
          throw new Error(this.errorMessage);
        })
      )
      .subscribe(res => {
        if (res.success) {
          this.list();
        }
      });
  }

  /**
   * Takes in a HttpErrorResponse and creates a user friendly error.
   * @param error
   * @returns string
   */
  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 400: {
        return `Duplicate record: ${error.message}`;
      }
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }
    }
  }

  ngOnDestroy(): void {
    this.employeesResponse$.unsubscribe();
    this.selectedEmployee$.unsubscribe();
  }
}
