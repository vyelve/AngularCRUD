import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Department } from 'src/app/models/department-model';
import { DepartmentService } from 'src/app/services/department.service';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddDepartmentComponent } from 'src/app/department/add-department/add-department.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditDepartmentComponent } from '../edit-department/edit-department.component';

@Component({
  selector: 'app-show-department',
  templateUrl: './show-department.component.html',
  styleUrls: ['./show-department.component.css']
})

export class ShowDepartmentComponent implements OnInit {

  constructor(private service: DepartmentService, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.service.listen().subscribe((m: any) => {
      console.log(m);
      this.refreshDeptList();
    }) 
  }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['options', 'DepartmentId', 'DepartmentName'];
  allDepartment: Observable<Department[]>;
  massage = null;

  @ViewChild(MatSort) sort: MatSort

  ngOnInit() {
    this.refreshDeptList();
  }

  refreshDeptList() {
    var _datalist = this.service.getDepartmentList().subscribe(data => {
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
    });
  }

  onEdit(dept: Department) {
    console.log(dept);
    this.service.formData = dept;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(EditDepartmentComponent, dialogConfig);
  }

  onDelete(Id: number) {
    console.log(Id);
    if(confirm('Are you sure to delete?')){
      this.service.deleteDepartment(Id).subscribe(res=>{
        this.refreshDeptList();
        this.massage = 'Record deleted Successfully';
        this.snackBar.open(this.massage, '', {
          duration: 5000,
          verticalPosition: 'top'
        });
      });
    }    
  }

  applyFilter(filtervalue: string) {
    this.listData.filter = filtervalue.trim().toLowerCase();
  }

  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(AddDepartmentComponent, dialogConfig);
  }
}
