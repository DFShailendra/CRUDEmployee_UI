import { Component, OnInit, ViewChild, Input, Inject} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatFormField } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { Employee,  RRF } from 'src/app/model/Employee.model';
import { employeeService } from 'src/app/service/employee.service';
import { department,gender,DDL} from 'src/app/model/Employee.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  RRFData:RRF[]=[]
  displayedColumns: string[] = ['RRFId', 'ManagerId', 'ClientId', 'ProjectId', 'RoleId','Actions'];
  dataSource!: MatTableDataSource<any>;
  genderDDL!: gender[];
  departmentDDL!: department[];
  resourceDDL!: DDL[];

  // @ViewChild(MatPaginator)
  // paginator!: MatPaginator;
  // @ViewChild(MatSort)
  // sort!: MatSort;

  @ViewChild(MatPaginator, { static: true })paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  constructor(
    private _employeeService: employeeService,
    private router: Router,
    ) { 
      //this.getDDL();
    }

  ngOnInit(): void {
    this.loadAllRRFRecords();
  }

  
  loadAllRRFRecords() {
    this._employeeService.getAll()
    .subscribe((response) => {
        // if (response.length == 0) {
        //   //this._notifyService.showInfo('No record found.', "Info");
          this.RRFData = response;
          this.dataSource = new MatTableDataSource(this.RRFData);
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          // Hide the splash screen
          //this._notifyService.showError(error, "Error")
        }
      )
  }

  editButton(id:number){  
    this.router.navigateByUrl('/rrf/addedit/'+id);
  }

  deleteButton(id: number){
  if(confirm('Are you sure you want to delete?')){
    this._employeeService.deleteData(id).subscribe(Result => {
    this.loadAllRRFRecords();
    this._employeeService.openSnackBar('The record has been deleted','OK');
    });
  }
  }

  getDDL(){
    return this._employeeService.getDDL().subscribe((response) => {
      },
      (error) => {
        // Hide the splash screen
        //this._notifyService.showError(error, "Error")
      });
  }



  // deleteRow(id: number) {
  //   this._employeeService.delete(id).subscribe(Result => {
  //     this._notifyService.showSuccess("Project " + " deleted successfully", "Success")
  //     this.loadAllEmployee();
  //   },
  //     error => {
  //       this._notifyService.showError(error, "Error")
  //     }
  //   );
  // }


}
