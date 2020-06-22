import { PagedGridStateModelBase } from 'src/app/shared/states/models/paged-grid-state.model.base';
import { SubTask } from 'src/app/models/sub-task.model';

export interface SubTaskStateModel extends PagedGridStateModelBase {
  subTasks: SubTask[];
  count: number;
}