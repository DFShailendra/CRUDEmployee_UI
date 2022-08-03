import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError ,retry} from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { Observable, ErrorObserver } from 'rxjs';
import { environment } from '../../environments/environment';
import { Employee } from '../model/Employee.model';
@Injectable({ providedIn: 'root' })
export class employeeService {
    constructor(private _httpClient: HttpClient) { }
    // Role: Role;
    data: any;
    // Http Headers
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }
    getAll() {
        return this._httpClient.get<Employee[]>(environment.baseUrl + '/Employee')
            .pipe(
                catchError((err) => {
                    console.error(err);
                    return throwError(err);    //Rethrow it back to component
                })
            )
    }

    getById(Id: number) {
        return this._httpClient.get<Employee>(environment.baseUrl + '/Employee/' + Id);
    }

    SaveDetails(employee:Employee): Observable<Employee> {
        debugger;
        // return this._httpClient.post(environment.baseUrl + '/EmailQueue', employee, this.httpOptions);
        return this._httpClient
        .post<Employee>(
            environment.baseUrl  + '/Employee',
          JSON.stringify(employee),
          this.httpOptions
        )
        .pipe(retry(1), catchError(this.handleError));
    }

    handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // Get client-side error
          errorMessage = error.error.message;
        } else {
          // Get server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(() => {
          return errorMessage;
        });
      }

    // UpdateDetails(emailqueue) {
    //     emailqueue.UserId = this.authenticationService.currentUserValue.id;

    //     return this._httpClient.put(environment.baseUrl + '/EmailQueue', emailqueue, this.httpOptions);
    // }

    delete(Id: number) {
        return this._httpClient.delete(environment.baseUrl + '/Employee/' + Id);
    }

    // getByStatusId(StatusId: number) {
    //     return this._httpClient.get<emailqueue[]>(environment.baseUrl + '/EmailQueue/GetByStatusId?StatusId=' + StatusId);
    // }

}