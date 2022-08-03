import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/Employee.model';
import { employeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  Data: any = [];
  employeeData:Employee[]=[]
  displayedColumns: string[] = ['employeeId', 'name', 'city', 'department', 'gender', 'phoneNumber', 'Actions'];
  dataSource!: MatTableDataSource<any>;
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
    private router: Router
    ) { 
    }

  ngOnInit(): void {
    this.loadAllEmployee();
  }

  
  loadAllEmployee() {
    this._employeeService.getAll()
    .subscribe((response) => {
        if (response.length == 0) {
          //this._notifyService.showInfo('No record found.', "Info");
        }
        else {
          this.employeeData = response;
          this.Data = response;
          this.dataSource = new MatTableDataSource(this.employeeData);
          this.dataSource.paginator = this.paginator;
        }
        },
        (error) => {
          // Hide the splash screen
          //this._notifyService.showError(error, "Error")
        }
      )
  }

  editButton(id:number){
    this.router.navigateByUrl('/employee/addedit/'+id);
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
