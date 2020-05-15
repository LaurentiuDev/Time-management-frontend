import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { CalendarModule } from 'ion2-calendar';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { TranslateModule } from '@ngx-translate/core';

const coreModules = [
  CommonModule,
  FormsModule,
  IonicModule,
  HttpClientModule,
  ReactiveFormsModule,
  MatInputModule,
  CalendarModule,
  NgxMaterialTimepickerModule
];

@NgModule({
  imports: [coreModules],
  exports: [coreModules, TranslateModule]
})

export class CoreModule { }
