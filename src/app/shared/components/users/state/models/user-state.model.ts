import { PagedGridStateModelBase } from 'src/app/shared/states/models/paged-grid-state.model.base';
import { User } from 'src/app/models/user.model';

export interface UserStateModel extends PagedGridStateModelBase {
  users: User[];
  count: number;
}
