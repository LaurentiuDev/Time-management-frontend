import { Injectable } from '@angular/core';
import { AppSettings } from '../settings/appsettings.service';
import { CrudServiceBase } from '../services/crud.service.base';
import { DataService } from '../services/data.service';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { SubTask } from 'src/app/models/sub-task.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SubTaskStateModel } from './state/models/sub-task-state.model';
import { SieveModel } from 'src/app/models/sieve.model';
import { tap, catchError } from 'rxjs/operators';
import { Sort } from '@angular/material/sort';

@Injectable({
  providedIn: 'root',
})

export class SubTaskService extends CrudServiceBase<SubTask> {
  private readonly _store = new BehaviorSubject<SubTaskStateModel>({
    subTasks: [],
    sorts: 'title',
    filters: '',
    count: 0,
    page: 0,
    pageSize: 10,
    loading: true,
  });

  readonly store$ = this._store.asObservable();

  get store(): SubTaskStateModel {
    return this._store.getValue();
  }

  set store(val: SubTaskStateModel) {
    this._store.next(val);
  }

  get tasks(): Observable<SubTask[]> {
    return of(this._store.getValue().subTasks);
  }

  get count(): number {
    return this._store.getValue().count;
  }

  get loading(): Observable<boolean> {
    return of(this._store.getValue().loading);
  }

  get page(): number {
    return this._store.getValue().page;
  }

  get pageSize(): number {
    return this._store.getValue().pageSize;
  }

  get sorts(): Observable<string> {
    return of(this._store.getValue().sorts);
  }

  get filters(): Observable<string> {
    return of(this._store.getValue().filters);
  }

  get url(): string {
    const { microDayApi, subTasks } = AppSettings.settings.MicroDayUrls;
    return `${microDayApi}/api/${subTasks}`;
  }

  constructor(
    protected readonly dataService: DataService,
    protected readonly toastController: ToastController,
    protected readonly route: ActivatedRoute
  ) {
    super(dataService, toastController);
  }

  getSubTasks(isLoadMore?: boolean) {
    if (isLoadMore) {
      this.store = {
        ...this.store,
        pageSize: this.store.pageSize + 10
      };
    }

    const sieveModel: SieveModel = this.getSieveModel(this.store);

    return this.getAll(sieveModel).pipe(
      tap((data) => {
        this.store = {
          ...this.store,
          subTasks: data.items,
          count: data.items.length,
          loading: false
        };
        this._store.next(this.store);
      }),
      catchError((error) => {
        this.store = {
          ...this.store,
          loading: false
        };
        this._store.next(this.store);
        return error;
      })
    );
  }

  addSubTask(subTask: SubTask) {
    return this.add(subTask).pipe(
      tap((data) => {
        this.getSubTasks().subscribe();
        this.showToast('Successfully added');
      }),
      catchError((error) => {
        this.store = {
          ...this.store,
          loading: false
        };
        this._store.next(this.store);
        return error;
      })
    );
  }

  updateSubTask(subTask: SubTask) {
    return this.update(subTask).pipe(
      tap((data) => {
        this.getSubTasks().subscribe();
        this.showToast('Successfully updated');
      }),
      catchError((error) => {
        this.store = {
          ...this.store,
          loading: false
        };
        this._store.next(this.store);
        return error;
      })
    );
  }

  deleteSubTask(id: string) {
    return this.delete(id).pipe(
      tap((data) => {
        if (!data) {
          return;
        }

        const subTasks = this.store.subTasks.filter((i) => i.id !== id);
        this.store = {
          ...this.store,
          subTasks
        };
        this._store.next(this.store);

        this.getSubTasks().subscribe();
        this.showToast('Successfully deleted');
      }),
      catchError((error) => {
        this.store = {
          ...this.store,
          loading: false
        };
        this._store.next(this.store);
        return error;
      })
    );
  }

  sortSubTasks(sort: Sort) {
    const sorts = this.getSort(sort);

    this.store = {
      ...this.store,
      sorts
    };

    this._store.next(this.store);
  }

  filterSubTasks(filters: string) {
    this.store = {
      ...this.store,
      filters
    };

    this._store.next(this.store);
  }

  updatePageSubTask(page: number) {
    this.store = {
      ...this.store,
      page
    };

    this._store.next(this.store);
  }
}