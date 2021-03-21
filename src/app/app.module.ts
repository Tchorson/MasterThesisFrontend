import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequestsComponent } from './components/pages/requests/requests.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { LoginComponent } from './components/pages/login/login.component';
import {UnknownComponent} from './components/pages/unknown/unknown.component';
import { FugitivesComponent } from './components/pages/fugitives/fugitives.component';
import { DailyComponent } from './components/pages/activity/daily/daily.component';
import { HistoryComponent } from './components/pages/activity/history/history.component';
import {ActivityComponent} from './components/pages/activity/activity.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CovidRiskEstimatorComponent } from './components/pages/covid-risk-estimator/covid-risk-estimator.component';

@NgModule({
  declarations: [
    AppComponent,
    RequestsComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    UnknownComponent,
    FugitivesComponent,
    ActivityComponent,
    DailyComponent,
    HistoryComponent,
    CovidRiskEstimatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatInputModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
