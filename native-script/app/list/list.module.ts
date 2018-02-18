import { NgModule, ModuleWithProviders } from '@angular/core';
import { ListOverviewComponent } from './list-overview/list-overview.component';
import { ListRoutingModule } from './list.routing';
import { NativeScriptUIListViewModule } from 'nativescript-pro-ui/listview/angular';
import { ToDoListComponent } from './todo-list/todo-list.component';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { ToDoListApiService } from './services/todo-list-api.service';
import { CreateTaskComponent } from './create-task/create-task.component';

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptUIListViewModule,
    ListRoutingModule
  ],
  exports: [
    ListOverviewComponent
  ],
  declarations: [
    ListOverviewComponent,
    ToDoListComponent,
    CreateTaskComponent
  ]
})
export class ListModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ListModule,
      providers: [
        ToDoListApiService
      ]
    }
  }
}
