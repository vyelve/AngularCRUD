import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  massage = null;
  public listItems: Array<string> = [];

  constructor(public dialogbox: MatDialogRef<AddEmployeeComponent>,
    public service: EmployeeService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.resetForm();
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

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();

    this.service.formData = {
      EmployeeID: 0,
      EmployeeName: '',
      Department: '',
      EmailId: '',
      DOJ: null
    }
  }

  onClose() {
    this.dialogbox.close();
    this.service.filter('Register click');
  }

  onSubmit(form: NgForm) {
    this.service.addEmployee(form.value).subscribe(res => {
      this.massage = 'Record saved Successfully';
      this.resetForm(form);
      this.snackBar.open(this.massage, '', {
        duration: 5000,
        verticalPosition: 'top'
      });
    });
  }
}
