import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskPage } from './task.page';
import { CoreModule } from 'src/app/core/core.module';
import { TaskNewComponent } from './components/task-new/task-new.component';
import { TaskFormComponent } from './forms/task-form/task-form.component';
import { EnumKeyValuePipe } from 'src/app/shared/pipes/enum-key-value.pipe';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';

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
  declarations: [TaskPage, TaskNewComponent, TaskDetailComponent, TaskFormComponent, EnumKeyValuePipe],
})
export class TaskPageModule { }
