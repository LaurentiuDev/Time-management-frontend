import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskPage } from './task.page';
import { CoreModule } from 'src/app/core/core.module';
import { TaskNewComponent } from './components/task-new/task-new.component';
import { TaskFormComponent } from './forms/task-form/task-form.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SubTaskFormComponent } from 'src/app/shared/sub-task/forms/sub-task-form/sub-task-form.component';
import { SubTaskNewComponent } from 'src/app/shared/sub-task/components/sub-task-new/sub-task-new.component';

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
  declarations: [TaskPage, TaskNewComponent, TaskDetailComponent, TaskFormComponent, SubTaskFormComponent, SubTaskNewComponent],
})
export class TaskPageModule { }
