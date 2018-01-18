import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { ListOverviewComponent } from './list-overview/list-overview.component';
import { ListDetailComponent } from './list-detail/list-detail.component';

const routes: Routes = [
  { path: '', component: ListOverviewComponent },
  { path: ':id', component: ListDetailComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class ListRoutingModule {
}
