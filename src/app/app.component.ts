import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular 8 App with Web API ';

  loadDept: boolean  = false;
  loadEmp : boolean = false;

  loadDepartmentComponent() {
    this.loadDept = true;
    this.loadEmp = false;
  }

  loadEmployeeComponent() {
    this.loadDept = false;
    this.loadEmp = true;
  }
}
