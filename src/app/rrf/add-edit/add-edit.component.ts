import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee,gender, RRF, DDL } from 'src/app/model/Employee.model';
import { employeeService } from 'src/app/service/employee.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  Id!: number;
  rrf!: RRF;
  ClientId!:number;
  RRFForm!: FormGroup;
  pageType!: string;
  genderDDL! : gender[];
  departmentDDL! : DDL[];
  resourceDDL!: DDL[];
  clientDDL!: DDL[];
  roleDDL!: DDL[];
  billableDDL!: DDL[];
  isinternalresourceDDL!:DDL[];
  numberofpositionDDL!:DDL[];
  positiontypesDDL!:DDL[];
  payroletypesDDL!:DDL[];
  minimumyearsofexperienceDDL!:DDL[];
  isremotelyDDL!:DDL[];
  projectDDL!:DDL[];


  constructor(private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _employeeService: employeeService,) { 
    this.rrf = new RRF(this.rrf);
    this.getDDL();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.RRFForm.controls;
  }
  ngOnInit(): void {
    this.RRFForm = this.createForm();
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
      this.RRFForm = this.createForm();
    }
  }

  createForm(): FormGroup {
    return this._formBuilder.group({
      RRFId: [this.rrf.rrfId],
      ManagerId:[this.rrf.managerId,[Validators.required]],
      ClientId:[this.rrf.clientId,[Validators.required]],
      ProjectId:[this.rrf.projectId,[Validators.required]],
      SubmissionDate: [this.rrf.submissionDate],
      RoleId:[this.rrf.roleId],
      IsBillable:[this.rrf.isBillable], 
      BillingRate:[this.rrf.billingRate], 
      BillingStartDate:[this.rrf.billingStartDate], 
      PositionTypeId:[this.rrf.positionTypeId], 
      IsInternalResourceId:[this.rrf.isInternalResourceId], 
      IdentifiedResourceId:[this.rrf.identifiedResourceId],  
      NumberOfPositionId:[this.rrf.numberOfPositionId], 
      PayroleTypeId:[this.rrf.payroleTypeId], 
      ApprovedByResourceId:[this.rrf.approvedByResourceId], 
      PrimaryTechnologies:[this.rrf.primaryTechnologies],
      MinimumYearsOfExperienceId:[this.rrf.minimumYearsOfExperienceId],
      MandatorySkills:[this.rrf.mandatorySkills],
      NiceToHaveSkills:[this.rrf.niceToHaveSkills],
      JobLocation:[this.rrf.jobLocation],
      IsRemotelyId:[this.rrf.isRemotelyId],
      InterviewByResourceId: [this.rrf.interviewByResourceId],
      JobDescription:[this.rrf.jobDescription],
      OtherInputs:[this.rrf.otherInputs],
      Remark: [this.rrf.remark],
    });
  }

  loadFromDetails() {
    this._employeeService.getById(this.Id).subscribe(Result => {
      if (Result == null) {
        this.rrf = new RRF(this.rrf);
      }
      else {
        this.rrf = new RRF(Result);
      }
      // Hide the splash screen
      this.RRFForm = this.createForm();
    });
  }

  errorHandling = (control: string, error: string) => {
    return this.RRFForm.controls[control].hasError(error);
  }

  SaveRRFRecordDetails(){
    const data = this.RRFForm.getRawValue();
    this._employeeService.SaveDetails(data).subscribe(Result => {
      
     if(this.pageType == 'new'){
         this._employeeService.openSnackBar('The RRF record has been added','OK');
      }
       else{
        this._employeeService.openSnackBar('The RRF record has been edited','OK');
       }
      this._router.navigate(["/rrf/list"]);
    },
      error => {
        // this.Loadbutton = false;
        // this._notifyService.showError(error.Message, "Error")

      }
    );
  }

  getDDL(){
    return this._employeeService.getDDL().subscribe((Result) => {
        this.resourceDDL = Result.resources;
        this.clientDDL = Result.clients;
        this.roleDDL = Result.roles;
        this.billableDDL = Result.billables;
        this.numberofpositionDDL = Result.numberOfPosition;
        this.isinternalresourceDDL = Result.isInternalResource;
        this.positiontypesDDL = Result.positionTypes;
        this.isremotelyDDL = Result.isRemotely;
        this.minimumyearsofexperienceDDL = Result.minimumYearsOfExperience;
        this.payroletypesDDL = Result.payroleType;
      },
      (error) => {
        // Hide the splash screen
        //this._notifyService.showError(error, "Error")
      });
  }

  getProjectDDL(){
    const data = this.RRFForm.getRawValue();

    return this._employeeService.getProjectDDL(data.ClientId).subscribe((Result) => {
        this.projectDDL = Result.project;
      },
      (error) => {
        // Hide the splash screen
        //this._notifyService.showError(error, "Error")
      });
  }

}
