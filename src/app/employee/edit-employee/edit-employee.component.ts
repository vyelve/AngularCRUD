import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  massage = null;
  public listItems: Array<string> = [];

  constructor(public dialogbox: MatDialogRef<EditEmployeeComponent>, 
    public service: EmployeeService, 
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.dropdownRefresh();
  }

  dropdownRefresh() {
    this.service.getDepDropDownValues().subscribe(data => {
      console.log(data);
      data.forEach(element => {
        this.listItems.push(element["DepartmentName"]);
      });
    })
  }

  onClose() {
    this.dialogbox.close();
    this.service.filter('Register click');
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.service.updateEmployee(form.value).subscribe(res => {
      this.massage = 'Record updated Successfully';
      this.snackBar.open(this.massage, '', {
        duration: 5000,
        verticalPosition: 'top'
      });
    });
  }
}
