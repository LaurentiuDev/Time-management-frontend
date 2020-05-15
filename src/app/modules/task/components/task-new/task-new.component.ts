import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Task } from 'src/app/models/task.model';
import { ModalController } from '@ionic/angular';
import { TaskFormValues } from '../../forms/task-form/task-form-values.model';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-task-new',
  templateUrl: './task-new.component.html',
})
export class TaskNewComponent {
  formGroup: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private taskService: TaskService
  ) {
    this.formGroup = this.formBuilder.group({
      form: [],
    });
  }

  save() {
    if (!this.formGroup.valid) {
      return;
    }

    const taskForm = this.formGroup.controls.form.value as TaskFormValues;
    const task = new Task();

    task.name = taskForm.name;
    task.description = taskForm.description;
    task.domain = taskForm.domain;
    task.priority = taskForm.priority;
    task.startDate = new Date(taskForm.startDate);
    task.endDate = new Date(taskForm.endDate);

    this.taskService.addTask(task).subscribe((_) => {
      this.closeDialog(true);
    });
  }

  async closeDialog(hasChanges?: boolean) {
    await this.modalController.dismiss(hasChanges);
  }
}