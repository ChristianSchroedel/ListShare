import { Component, OnInit } from '@angular/core';
import { ListViewEventData } from 'nativescript-pro-ui/listview';
import { View } from 'tns-core-modules/ui/core/view';
import { ToDoListApiService } from '../services/todo-list-api.service';

import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable//empty';
import { ToDoList } from '../models/todo-list';

@Component({
  moduleId: module.id,
  selector: 'list-overview',
  templateUrl: './list-overview.component.html',
  styleUrls: ['./list-overview.component.css']
})
export class ListOverviewComponent implements OnInit {
  public lists$: Observable<ToDoList[]> = empty();

  constructor(private apiService: ToDoListApiService) { }

  public ngOnInit() {
    this.lists$ = this.apiService.getToDoLists();
  }
}
