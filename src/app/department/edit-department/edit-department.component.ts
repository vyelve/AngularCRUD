import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DepartmentService } from 'src/app/services/department.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css']
})
export class EditDepartmentComponent implements OnInit {
  massage = null;

  constructor(public dialogbox: MatDialogRef<EditDepartmentComponent>,
    public service: DepartmentService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogbox.close();
    this.service.filter('Register click');
  }
  onSubmit(form: NgForm) {
    console.log(form.value);
    this.service.updateDepartment(form.value).subscribe(res => {
      this.massage = 'Record updated Successfully';
      this.snackBar.open(this.massage, '', {
        duration: 5000,
        verticalPosition: 'top'
      });
    });
  }
}
