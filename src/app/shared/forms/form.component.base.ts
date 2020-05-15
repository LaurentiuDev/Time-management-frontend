import { ControlValueAccessor, FormGroup, FormControl } from '@angular/forms';
import { OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModelBase } from 'src/app/models/model.base';
import { FormValuesBase } from 'src/app/models/form-value.model.base';
import { Constants } from '../utils/data.constants';

export abstract class FormComponentBase<TModel extends ModelBase, TFormValue extends FormValuesBase>
  implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() public model: TModel;
  Constants = Constants;

  protected subscriptions: Subscription[] = [];

  public form: FormGroup;

  get value(): TFormValue {
    return this.form.value;
  }

  set value(value: TFormValue) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  constructor() { }

  abstract initForm();

  ngOnInit() {
    this.initForm();

    this.subscriptions.push(
      this.form.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      }),
      this.form.statusChanges.subscribe((_) => {
        this.onChange(this.form.value);
        this.onTouched();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(object: any) {
    if (!object) return;

    this.value = object;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  validate(_: FormControl) {
    return this.form.valid ? null : { form: { valid: false } };
  }
}
