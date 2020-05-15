import { Task } from 'src/app/models/task.model';
import { PagedGridStateModelBase } from 'src/app/shared/states/models/paged-grid-state.model.base';

export interface TaskStateModel extends PagedGridStateModelBase {
  tasks: Task[];
  count: number;
}
