import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskPage } from './task.page';
import { CoreModule } from 'src/app/core/core.module';

const routes: Routes = [
  {
    path: '',
    component: TaskPage
  }
];

@NgModule({
  imports: [
    CoreModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TaskPage]
})
export class TaskPageModule { }
