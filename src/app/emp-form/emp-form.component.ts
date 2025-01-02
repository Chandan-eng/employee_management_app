import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-form',
  standalone: false,
  
  templateUrl: './emp-form.component.html',
  styleUrl: './emp-form.component.scss'
})
export class EmpFormComponent implements OnInit {
  empForm !:FormGroup;
qualifications =['B.Tech', 'M.Tech', 'MCA', 'MBA', 'Ph.D'];

constructor(private _fb: FormBuilder,
  private _empService: EmployeeService,
  private _dialogRef: MatDialogRef<EmpFormComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private _coreService:CoreService
) { 
  this.empForm = this._fb.group({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    gender: '',
    qualification: '',
    company:'',
    experience: '',
    salary:''
  });
}

ngOnInit() {
  if(this.data) {
    this.empForm.patchValue(this.data);
  }
}

onSubmit() {
  if(this.empForm.invalid) {
    return;
  }
  if(this.data) {
    this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
      next: (val) => {
        this._coreService.openSnackBar('Employee updated successfully', 'Updated!');
        this._dialogRef.close(true);
      },
      error: (err) => {
        console.log('Error while updating employee', err);
      }
    });
    return;
  }
  this._empService.addEmployee(this.empForm.value).subscribe({
    next: (val:any) => {
      this._coreService.openSnackBar('Employee added successfully', 'Created!');
      this._dialogRef.close(true);
    },
    error: (err) => {
      console.log('Error while adding employee', err);
  }
  });
}

}
