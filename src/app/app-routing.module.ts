import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RequestsComponent} from './components/pages/requests/requests.component';
import {UnknownComponent} from './components/pages/unknown/unknown.component';
import {LoginComponent} from './components/pages/login/login.component';
import {AuthGaurdService} from './services/auth-gaurd.service';
import {FugitivesComponent} from './components/pages/fugitives/fugitives.component';
import {ActivityComponent} from './components/pages/activity/activity.component';
import {DailyComponent} from './components/pages/activity/daily/daily.component';
import {HistoryComponent} from './components/pages/activity/history/history.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'requests', component: RequestsComponent, canActivate: [AuthGaurdService]},
  {path: 'unknown-status', component: UnknownComponent, canActivate: [AuthGaurdService]},
  {path: 'fugitives', component: FugitivesComponent, canActivate: [AuthGaurdService]},
  {
    path: 'activity', component: ActivityComponent, canActivate: [AuthGaurdService],
    children: [
      {path: 'daily', component: DailyComponent},
      {path: 'history', component: HistoryComponent},
      {path: '', redirectTo: 'daily', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
