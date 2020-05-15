import { SieveModel } from 'src/app/models/sieve.model';
import { PagedGridParameters } from 'src/app/models/paged-grid-parameters.model';
import { Sort } from '@angular/material/sort';
import { PagedGridStateModelBase } from './models/paged-grid-state.model.base';

export abstract class PagedGridStateBase {
  protected getSieveModel(store: PagedGridStateModelBase): SieveModel {
    return {
      page: store.page + 1,
      pageSize: store.pageSize,
      sorts: store.sorts,
      filters: store.filters,
    };
  }

  public getDefaultPagedParameters(): PagedGridParameters {
    return { page: 1, pageSize: 10 };
  }

  protected getSort(sort: Sort): string {
    const direction: string = sort.direction === 'desc' ? '-' : '';
    return `${direction}${sort.active}`;
  }
}
