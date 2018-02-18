import {Component, OnInit} from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";

@Component({
  selector: 'create-task',
  moduleId: module.id,
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  public taskName = '';
  public taskDescription = '';

  constructor(public routerExtensions: RouterExtensions) {
  }

  ngOnInit() {
    console.log(this.routerExtensions.router.url);
  }
}
