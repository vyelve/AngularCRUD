import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Employee } from 'src/app/models/employee-model';
import { EmployeeService } from 'src/app/services/employee.service';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddEmployeeComponent } from 'src/app/employee/add-employee/add-employee.component';
import { EditEmployeeComponent } from 'src/app/employee//edit-employee/edit-employee.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-show-employee',
  templateUrl: './show-employee.component.html',
  styleUrls: ['./show-employee.component.css']
})
export class ShowEmployeeComponent implements OnInit {

  constructor(private service: EmployeeService, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.service.listen().subscribe((m: any) => {
      console.log(m);
      this.refreshEmpList();
    })
  }

  listEmployeeData: MatTableDataSource<any>;
  displayedColumns: string[] = ['options', 'EmployeeID', 'EmployeeName', 'Department', 'EmailId', 'DOJ'];
  allEmployee: Observable<Employee[]>;
  massage = null;

  @ViewChild(MatSort) sort: MatSort

  ngOnInit(): void {
    this.refreshEmpList();
  }

  refreshEmpList() {
    var _datalist = this.service.getEmployeeList().subscribe(data => {
      this.listEmployeeData = new MatTableDataSource(data);
      this.listEmployeeData.sort = this.sort;
    });
  }

  onEdit(emp: Employee) {
    this.service.formData = emp;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(EditEmployeeComponent, dialogConfig);
  }

  onDelete(Id: number) {
    console.log(Id);
    if (confirm('Are you sure to delete?')) {
      this.service.deleteEmployee(Id).subscribe(res => {
        this.refreshEmpList();
        this.massage = 'Record deleted Successfully';
        this.snackBar.open(this.massage, '', {
          duration: 5000,
          verticalPosition: 'top'
        });
      });
    }
  }

  applyFilter(filtervalue: string) {
    this.listEmployeeData.filter = filtervalue.trim().toLowerCase();
  }

  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    this.dialog.open(AddEmployeeComponent, dialogConfig);
  }
}
