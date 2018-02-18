import { Component, OnInit, ViewChild } from '@angular/core';
import { ListViewEventData, RadListView } from 'nativescript-pro-ui/listview';
import { View } from 'tns-core-modules/ui/core/view';
import { RadListViewComponent } from 'nativescript-pro-ui/listview/angular';
import { inputType, prompt, PromptOptions, PromptResult } from 'ui/dialogs';
import { TextField } from 'ui/text-field';

import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { ToDoListApiService } from '../services/todo-list-api.service';
import { PageRoute } from 'nativescript-angular/router';
import { tap, switchMap, share } from 'rxjs/operators';
import { ToDoList } from '../models/todo-list';

@Component({
  moduleId: module.id,
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class ToDoListComponent implements OnInit {
  @ViewChild(RadListViewComponent) listViewComponent: RadListViewComponent;

  public toDoList: ToDoList;

  constructor(private pageRoute: PageRoute,
              private apiService: ToDoListApiService) {
  }

  public ngOnInit() {
    this.pageRoute.activatedRoute.pipe(
      switchMap(activatedRoute => activatedRoute.params),
      switchMap(params => this.apiService.getToDoListById(params['id']))
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
    const options: PromptOptions = {
      title: 'New Task',
      inputType: inputType.text,
      okButtonText: 'Create',
      cancelButtonText: 'Cancel',
    };

    prompt(options).then(promptResult => {
      if (promptResult.result) {
        this.toDoList.addEntry(promptResult.text);
      }
    });
  }

  public addQuickTask(args) {
    const textField = args.object as TextField;
    const text = textField.text;

    if (!text) {
      return;
    }

    this.toDoList.addEntry(text);
    textField.text = '';
  }
}
