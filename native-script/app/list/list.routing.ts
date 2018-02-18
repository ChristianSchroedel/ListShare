import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { ListOverviewComponent } from './list-overview/list-overview.component';
import { ToDoListComponent } from './todo-list/todo-list.component';

const routes: Routes = [
  { path: '', component: ListOverviewComponent },
  { path: ':id', component: ToDoListComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class ListRoutingModule {
}
