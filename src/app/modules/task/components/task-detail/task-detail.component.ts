import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Task } from 'src/app/models/task.model';
import { ModalController, NavParams } from '@ionic/angular';
import { TaskService } from '../../task.service';
import { TaskFormValues } from '../../forms/task-form/task-form-values.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
})
export class TaskDetailComponent {
  formGroup: FormGroup;
  data: Task;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private navParams: NavParams
  ) {
    this.formGroup = this.formBuilder.group({
      form: [],
    });
    this.data = navParams.data.data as Task;
    this.initData(this.data);
  }

  save() {
    if (!this.formGroup.valid) {
      return;
    }

    const taskForm = this.formGroup.controls.form.value as TaskFormValues;
    const task = new Task();
    task.id = this.data.id;
    task.name = taskForm.name;
    task.description = taskForm.description;
    task.domain = taskForm.domain;
    task.priority = taskForm.priority;
    task.startDate = taskForm.startDate;
    task.endDate = taskForm.endDate;

    this.taskService.updateTask(task).subscribe((_) => {
      this.closeDialog(true);
    });
  }

  public async closeDialog(hasChanges?: boolean) {
    await this.modalController.dismiss(hasChanges);
  }

  private initData(data: Task) {
    if (!data) return;

    this.formGroup.controls.form.setValue({
      name: data.name,
      description: data.description,
      domain: data.domain,
      priority: data.priority,
      startDate: data.startDate,
      endDate: data.endDate,
      completed: data.completed
    });
  }
}