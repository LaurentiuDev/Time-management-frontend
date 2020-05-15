import { StateModelBase } from './state.model.base';

export interface PagedGridStateModelBase extends StateModelBase {
  page: number;
  pageSize: number;
  sorts: string;
  filters: string;
}
