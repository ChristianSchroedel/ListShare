import { Component, OnInit, ViewChild } from '@angular/core';
import { ListViewEventData, RadListView } from 'nativescript-pro-ui/listview';
import { View } from 'tns-core-modules/ui/core/view';
import { RadListViewComponent } from 'nativescript-pro-ui/listview/angular';

import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { ToDoListApiService } from '../services/todo-list-api.service';
import { PageRoute } from 'nativescript-angular/router';
import { tap, switchMap, share } from 'rxjs/operators';
import { ToDoList } from '../models/todo-list';

@Component({
  moduleId: module.id,
  selector: 'list-detail',
  templateUrl: 'list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {
  @ViewChild(RadListViewComponent) listViewComponent: RadListViewComponent;

  public toDoList: ToDoList;

  constructor(private pageRoute: PageRoute, private apiService: ToDoListApiService) {
  }

  public ngOnInit() {
    this.pageRoute.activatedRoute.pipe(
      switchMap(activatedRoute => activatedRoute.params),
      switchMap(params => this.apiService.getToDoListById(params['id'])),
      tap(x => console.log('list', JSON.stringify(x)))
    )
      .subscribe(toDoList => this.toDoList = toDoList);
  }

  public onSwipeCellStarted(args: ListViewEventData) {
    const swipeLimits = args.data.swipeLimits;
    const swipeView = args['object'];

    const checkItem = swipeView.getViewById<View>('check-view');
    const deleteItem = swipeView.getViewById<View>('delete-view');

    swipeLimits.left = checkItem.getMeasuredWidth();
    swipeLimits.right = deleteItem.getMeasuredWidth();
    swipeLimits.threshold = deleteItem.getMeasuredWidth() / 2;
  }

  public deleteItem(args: ListViewEventData) {
    this.toDoList.deleteEntry(args.object.bindingContext.id);
  }

  public checkItem(args: ListViewEventData) {
    const item = args.object.bindingContext;

    this.toDoList.setEntryDone(item.id, !item.done);

    this.listViewComponent.listView.notifySwipeToExecuteFinished();
  }

  public addItem() {
    this.toDoList.addEntry('Added by FAB');
  }
}
