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

  constructor(private httpClient: HttpClient) {}

  /**
   * Keeps track of all Employees.
   * @param response 
   * @returns void
   */
  private setEmployeesResponse(response: IResponseWrapper<IEmployee[]>): void {
    this.employeesResponseStore.response = response;
    this.employeesResponse$.next(response);
  }

  /**
   * Gets a list of all available Employees.
   * 
   * The result is stored in employeesResponse.
   * @returns void
   */
  findAll(): void {
    this.httpClient
      .get<IResponseWrapper<IEmployee[]>>(this.baseUrl + '/find-all', {})
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
  }
}
