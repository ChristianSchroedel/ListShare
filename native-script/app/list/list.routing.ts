import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { ListOverviewComponent } from './list-overview/list-overview.component';
import { ToDoListComponent } from './todo-list/todo-list.component';
import { CreateTaskComponent } from './create-task/create-task.component';

const routes: Routes = [
  { path: '', component: ListOverviewComponent },
  { path: 'todo-list/:id', component: ToDoListComponent },
  { path: 'create-task', component: CreateTaskComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class ListRoutingModule {
}
