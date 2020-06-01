import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DepartmentService } from 'src/app/services/department.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})

export class AddDepartmentComponent implements OnInit {
  massage = null;
  
  constructor(public dialogbox: MatDialogRef<AddDepartmentComponent>,
    public service: DepartmentService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();

    this.service.formData = {
      DepartmentId: 0,
      DepartmentName: ''
    }
  }

  onClose() {
    this.dialogbox.close();
    this.service.filter('Register click');
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.service.addDepartment(form.value).subscribe(res => {
      this.massage = 'Record saved Successfully';
      this.resetForm(form);
      this.snackBar.open(this.massage, '', {
        duration: 5000,
        verticalPosition: 'top'
      });
    });
  }

}
