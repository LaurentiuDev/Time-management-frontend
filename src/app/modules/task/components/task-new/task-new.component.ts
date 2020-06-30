import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Task } from 'src/app/models/task.model';
import { ModalController } from '@ionic/angular';
import { TaskFormValues } from '../../forms/task-form/task-form-values.model';
import { TaskService } from '../../task.service';
//import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-task-new',
  templateUrl: './task-new.component.html',
})
export class TaskNewComponent {
  formGroup: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    //private readonly localNotifications: LocalNotifications,
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
    task.completed = taskForm.completed;
    task.startDate = this.getDateTime(taskForm.startDate, taskForm.startTime);

    // this.localNotifications.schedule({
    //   text: 'Delayed ILocalNotification',
    //   trigger: { at: new Date(task.startDate.getTime()) },
    //   led: 'FF0000',
    //   sound: null
    // });

    task.endDate = this.getDateTime(taskForm.endDate, taskForm.endTime);

    this.taskService.addTask(task).subscribe((_) => {
      this.closeDialog(true);
    });
  }

  async closeDialog(hasChanges?: boolean) {
    await this.modalController.dismiss(hasChanges);
  }

  private getDateTime(date: Date, time: string): Date {
    const timeArray = time.split(':');
    const hours = Number(timeArray[0]);
    const minutes = Number(timeArray[1].split(' ')[0]);
    date.setHours(hours, minutes, 0, 0);
    return date;
  }
}