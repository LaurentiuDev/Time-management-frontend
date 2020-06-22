import { Component, forwardRef, OnInit, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormBuilder, Validators } from '@angular/forms';
import { FormComponentBase } from 'src/app/shared/forms/form.component.base';
import { SubTask } from 'src/app/models/sub-task.model';
import { Priority } from 'src/app/shared/enums/priority.enum';
import { SubTaskFormValues } from './sub-task-form-values.model';

@Component({
  selector: 'app-sub-task-form',
  templateUrl: './sub-task-form.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SubTaskFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SubTaskFormComponent),
      multi: true,
    },
  ],
})

export class SubTaskFormComponent extends FormComponentBase<SubTask, SubTaskFormValues> implements OnInit {
  public Priority = Priority;

  @Input() model: SubTask;

  get titleControl() {
    return this.form.controls.title;
  }

  get priorityControl() {
    return this.form.controls.priority;
  }

  constructor(
    private formBuilder: FormBuilder,
  ) {
    super();
  }

  initForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(64)]],
      priority: ['', [Validators.required]],
      completed: [false],
    });
  }

  public loadFlags() {
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
}