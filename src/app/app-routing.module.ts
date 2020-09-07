import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RequestsComponent} from './components/pages/requests/requests.component';
import {UnknownComponent} from './components/pages/unknown/unknown.component';
import {LoginComponent} from './components/pages/login/login.component';
import {AuthGaurdService} from './services/auth-gaurd.service';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'requests', component: RequestsComponent, canActivate: [AuthGaurdService]},
  {path: 'unknown-status', component: UnknownComponent, canActivate: [AuthGaurdService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
