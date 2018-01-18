import { NgModule, ModuleWithProviders } from '@angular/core';
import { ListOverviewComponent } from './list-overview/list-overview.component';
import { ListRoutingModule } from './list.routing';
import { NativeScriptUIListViewModule } from 'nativescript-pro-ui/listview/angular';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { ToDoListApiService } from './services/todo-list-api.service';

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptUIListViewModule,
    ListRoutingModule
  ],
  exports: [
    ListOverviewComponent,
    ListDetailComponent
  ],
  declarations: [
    ListOverviewComponent,
    ListDetailComponent
  ],
  providers: [],
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
