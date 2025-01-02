import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpFormComponent } from './emp-form/emp-form.component';
import { EmployeeService } from './services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'employee-management-app';

  displayedColumns: string[] = [
    'id','firstName', 'lastName', 'email', 'dob','gender','qualification','company','experience','salary','actions'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog,
    private _empService:EmployeeService,
    private _coreService:CoreService
  ) {}
  openAddEditEmpForm() {
  const dialogRef=  this._dialog.open(EmpFormComponent, {
      width: '500px',
      height: '500px'
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        console.log('Dialog closed', val);
        this.getEmployeesList();
      }
    });
  }

  ngOnInit() {
    this.getEmployeesList();
  }

  getEmployeesList() {
    this._empService.getEmployeesList().subscribe({
      next: (val) => {
        // console.log('Employees list', val);
        this.dataSource = new MatTableDataSource(val);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log('Error while fetching employees list', err);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id:number) {
    this._empService.deleteEmployee(id).subscribe({
      next: (val) => {
        this._coreService.openSnackBar('Employee deleted successfully', 'Close');
        this.getEmployeesList();
      },
      error: (err) => {
        console.log('Error while deleting employee', err);
      }
    });
  }

  editEmployee(emp:any) {
    const dialogRef = this._dialog.open(EmpFormComponent, {
      width: '500px',
      height: '500px',
      data: emp
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        console.log('Dialog closed', val);
        this.getEmployeesList();
      }
    });
  }

}
