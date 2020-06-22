import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SubTask } from 'src/app/models/sub-task.model';
import { SubTaskFormValues } from '../../forms/sub-task-form/sub-task-form-values.model';
import { SubTaskService } from '../../sub-task.service';

@Component({
  selector: 'app-sub-task-new',
  templateUrl: './sub-task-new.component.html',
})
export class SubTaskNewComponent {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private subTaskService: SubTaskService,
  ) {
    this.formGroup = this.formBuilder.group({
      form: [],
    });
  }

  save() {
    if (!this.formGroup.valid) {
      return;
    }

    const subTaskForm = this.formGroup.controls.form.value as SubTaskFormValues;
    const subTask = new SubTask();

    subTask.title = subTaskForm.title;
    subTask.priority = subTaskForm.priority;
    subTask.completed = subTaskForm.completed;
    subTask.taskId = subTaskForm.taskId;

    this.subTaskService.addSubTask(subTask).subscribe((_) => {
    });
  }
}