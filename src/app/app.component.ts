import { Component } from '@angular/core';
import { DashbaordComponent } from './dashbaord/dashbaord.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ DashbaordComponent ],
  templateUrl:'./app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
