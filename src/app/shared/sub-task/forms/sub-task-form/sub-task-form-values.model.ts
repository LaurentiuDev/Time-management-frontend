import { FormValuesBase } from 'src/app/models/form-value.model.base';
import { Priority } from 'src/app/shared/enums/priority.enum';

export interface SubTaskFormValues extends FormValuesBase {
  taskId: string;
  title: string;
  priority: Priority;
  completed: boolean;
}