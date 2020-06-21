import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskPage } from './task.page';
import { CoreModule } from 'src/app/core/core.module';
import { TaskNewComponent } from './components/task-new/task-new.component';
import { TaskFormComponent } from './forms/task-form/task-form.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: TaskPage
  }
];

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TaskPage, TaskNewComponent, TaskDetailComponent, TaskFormComponent],
})
export class TaskPageModule { }
