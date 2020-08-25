import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RequestsComponent} from './components/pages/requests/requests.component';
import {UnknownComponent} from './components/pages/unknown/unknown.component';

const routes: Routes = [
  {path: '', component: RequestsComponent},
  {path: 'unknown-status', component: UnknownComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
