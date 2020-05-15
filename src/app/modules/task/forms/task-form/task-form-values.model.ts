import { Priority } from 'src/app/shared/enums/priority.enum';
import { FormValuesBase } from 'src/app/models/form-value.model.base';

export interface TaskFormValues extends FormValuesBase {
  name: string;
  description: string;
  domain: string;
  priority: Priority;
  startDate: Date;
  endDate: Date;
  completed: boolean;
}