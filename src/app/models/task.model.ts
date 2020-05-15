import { ModelBase } from './model.base';
import { Priority } from '../shared/enums/priority.enum';

export class Task extends ModelBase {
  public name: string;
  public description: string;
  public domain: string;
  public priority: Priority;
  public startDate: Date;
  public endDate: Date;
  public completed: boolean;
}