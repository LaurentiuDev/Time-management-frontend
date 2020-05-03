import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClasamentPage } from './clasament.page';
import { CoreModule } from 'src/app/core/core.module';

const routes: Routes = [
  {
    path: '',
    component: ClasamentPage
  }
];

@NgModule({
  imports: [
    CoreModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ClasamentPage]
})
export class ClasamentPageModule { }
