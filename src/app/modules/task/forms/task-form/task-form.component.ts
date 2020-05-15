import { FormComponentBase } from 'src/app/shared/forms/form.component.base';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormBuilder, Validators } from '@angular/forms';
import { Component, forwardRef, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskFormValues } from './task-form-values.model';
import { DatePipe } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { CalendarModal, CalendarResult } from 'ion2-calendar';
import { Priority } from 'src/app/shared/enums/priority.enum';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TaskFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TaskFormComponent),
      multi: true,
    },
  ],
})

export class TaskFormComponent extends FormComponentBase<Task, TaskFormValues> implements OnInit {
  public startDate: Date;
  public endDate: Date;
  public startTime = this.datePipe.transform(new Date(), 'H:m a');
  public endTime = this.datePipe.transform(new Date(new Date().getTime() + 3600).toISOString(), 'H:m a');
  public Priority = Priority;

  @Input() model: Task;

  get nameControl() {
    return this.form.controls.name;
  }

  get descriptionControl() {
    return this.form.controls.description;
  }

  get domainControl() {
    return this.form.controls.domain;
  }

  get priorityControl() {
    return this.form.controls.priority;
  }

  get startDateControl() {
    return this.form.controls.startDate;
  }

  get endDateControl() {
    return this.form.controls.endDate;
  }

  constructor(
    public modalCtrl: ModalController,
    private readonly formBuilder: FormBuilder,
    private readonly datePipe: DatePipe,
  ) {
    super();
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(64)]],
      description: ['', [Validators.maxLength(510)]],
      domain: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      completed: [false]
    });
    if (!this.model) {
      this.startTime = this.datePipe.transform(new Date(), 'H:mm a').toString();
      this.endTime = this.datePipe.transform(new Date().setHours(new Date().getHours() + 1), 'H:mm a').toString();
      this.startDate = this.getDateTime(new Date(), this.startTime);
      this.endDate = this.getDateTime(new Date(), this.endTime);
    } else {
      this.startDate = new Date(this.model.startDate);
      this.endDate = new Date(this.model.endDate);
      this.startTime = this.datePipe.transform(this.startDate, 'H:mm a').toString();
      this.endTime = this.datePipe.transform(this.endDate, 'H:mm a').toString();
    }

    this.form.patchValue({
      startDate: this.startDate,
      endDate: this.endDate
    });
  }

  private getDateTime(date: Date, time: string): Date {
    const timeArray = time.split(':');
    const hours = Number(timeArray[0]);
    const minutes = Number(timeArray[1].split(' ')[0]);
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  loadFlags() {
    setTimeout(() => {
      const popoverRef = document.getElementsByClassName('item in-list ion-activatable ion-focusable item-label hydrated');

      for (let index = 1; index < popoverRef.length; index++) {
        const element = popoverRef[index];
        let color;
        switch (index) {
          case 1:
            color = 'success';
            break;
          case 2:
            color = 'warning';
            break;
          case 3:
            color = 'danger';
            break;
        }
        const ionIcon = `<ion-icon color='${color}' name='flag-outline' style='padding-right: 10px;'></ion-icon>`;

        element.firstElementChild.insertAdjacentHTML('beforebegin', ionIcon);
        element.className.concat(color);

        if (index === popoverRef.length - 1) {
          element.setAttribute('lines', 'none');
        }
      }
    }, 100);
  }

  async openStartDateCalendar() {
    const date = await this.openCalendar();
    if (date) {
      this.startDate = this.getDateTime(date.dateObj, this.startTime);
      this.form.patchValue({
        startDate: this.startDate
      })
    }
  }

  async openEndDateCalendar() {
    const date = await this.openCalendar();
    if (date) {
      this.endDate = this.getDateTime(date.dateObj, this.endTime);
      this.form.patchValue({
        endDate: this.endDate
      })
    }
  }

  async openCalendar() {
    const options = {
      //pickMode: 'multi',
      title: '',
      color: 'dark'
    };

    const myCalendar = await this.modalCtrl.create({
      component: CalendarModal,
      componentProps: { options }
    });

    myCalendar.present();

    const event: any = await myCalendar.onDidDismiss();
    const date: CalendarResult = event.data;

    return date;
  }
}