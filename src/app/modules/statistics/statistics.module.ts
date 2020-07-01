import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticsPage } from './statistics.page';
import { CoreModule } from 'src/app/core/core.module';
import { ChartsModule } from 'ng2-charts';

const routes: Routes = [
  {
    path: '',
    component: StatisticsPage
  }
];

@NgModule({
  imports: [
    CoreModule,
    RouterModule.forChild(routes),
    ChartsModule
  ],
  declarations: [StatisticsPage]
})
export class StatisticsPageModule { }
