import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

const coreModules = [
  CommonModule,
  FormsModule,
  IonicModule,
  HttpClientModule,
  ReactiveFormsModule,
];

@NgModule({
  imports: [coreModules],
  exports: [coreModules]
})

export class CoreModule { }
