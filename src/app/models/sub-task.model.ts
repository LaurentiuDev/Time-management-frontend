import { ModelBase } from './model.base';
import { Priority } from '../shared/enums/priority.enum';

export class SubTask extends ModelBase {
  public taskId: string;
  public title: string;
  public priority: Priority;
  public completed: boolean;
}