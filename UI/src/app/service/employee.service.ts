import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError ,retry} from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { Observable,ErrorObserver } from 'rxjs';
import { environment } from '../../environments/environment';
import { Employee } from '../model/Employee.model';
import { getDDL } from './../model/Employee.model';
import { MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class employeeService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
    constructor(private _httpClient: HttpClient,
      private snackBar:MatSnackBar) { }
    // Role: Role;
    data: any;
    // Http Headers
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }
    getAll() {
        return this._httpClient.get<Employee[]>(environment.baseUrl + '/employee')
            .pipe(
                catchError((err) => {
                    console.error(err);
                    return throwError(err);    //Rethrow it back to component
                })
            )
    }

    getDDL() {
      return this._httpClient.get<getDDL>(environment.baseUrl + '/employee/getDDL')
          .pipe(
              catchError((err) => {
                  console.error(err);
                  return throwError(err);    //Rethrow it back to component
              })
          )
  }


    getById(Id: number) {
        return this._httpClient.get<Employee>(environment.baseUrl + '/employee/' + Id);
    }

    SaveDetails(employee:Employee): Observable<Employee> {
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

    // deleteData(Id: number) {
    //   debugger;
    //   return this._httpClient.delete<Employee>(environment.baseUrl + '/employee/' + Id,this.httpOptions).pipe(catchError(this.handleError));
    // }

  //   deleteData(Id: number) {
  //     return this._httpClient.delete<Employee>(environment.baseUrl + '/employee/' + Id);
  // }

  deleteData(Id: number) {
    // return this._httpClient.post(environment.baseUrl + '/EmailQueue', employee, this.httpOptions);
    return this._httpClient
    .delete<Employee>(
        environment.baseUrl  + '/Employee/'+ Id,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.handleError));
}

openSnackBar(message: string, action: string){
  this.snackBar.open(message,action,{
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
  });
}
    // getByStatusId(StatusId: number) {
    //     return this._httpClient.get<emailqueue[]>(environment.base Url + '/EmailQueue/GetByStatusId?StatusId=' + StatusId);
    // }

}