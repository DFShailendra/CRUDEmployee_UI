import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/model/Employee.model';
import { employeeService } from 'src/app/service/employee.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  Id!: number;
  employee!: Employee;
  EmployeeForm!: FormGroup;
  pageType!: string;
  constructor(private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _employeeService: employeeService,) { 
    this.employee=new Employee(this.employee);
  }
  get f(): { [key: string]: AbstractControl } {
    return this.EmployeeForm.controls;
  }
  ngOnInit(): void {
    this.EmployeeForm = this.createForm();
    this._route.params.forEach(
      (params: Params) => {
        this.Id = params["Id"];
      }
    );
    if (this.Id > 0) {
      this.pageType = 'edit';
      this.loadFromDetails();
    }
    else {
      // Hide the splash screen
      this.pageType = 'new';
      this.EmployeeForm = this.createForm();
    }
  }

  createForm(): FormGroup {
    return this._formBuilder.group({
      employeeId: [this.employee.employeeId],
      name: [this.employee.name,[Validators.required]],
      city: [this.employee.city],
      department: [this.employee.department],
      gender: [this.employee.gender],
      phoneNumber: [this.employee.phoneNumber,[Validators.required]]
    });
  }

  loadFromDetails() {
    this._employeeService.getById(this.Id).subscribe(Result => {
      if (Result == null) {
        this.employee = new Employee(this.employee);
      }
      else {
        this.employee = new Employee(Result);
      }
      // Hide the splash screen
      this.EmployeeForm = this.createForm();
    });
  }
  public errorHandling = (control: string, error: string) => {
    return this.EmployeeForm.controls[control].hasError(error);
  }

  SaveEmployeeDetails(){
    const data = this.EmployeeForm.getRawValue();
    this._employeeService.SaveDetails(data).subscribe(Result => {
      
      // if (Result.ClientId == 0){
      //   this._notifyService.showSuccess(data.ClientName + " saved successfully", "Success")
      // }
      // else{
      //   this._notifyService.showSuccess(data.ClientName + " updated successfully", "Success")
      // }
      this._router.navigate(["/employee/list"]);
    },
      error => {
        // this.Loadbutton = false;
        // this._notifyService.showError(error.Message, "Error")

      }
    );
  }

}
