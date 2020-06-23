import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CrudServiceBase } from '../../services/crud.service.base';
import { User } from 'src/app/models/user.model';
import { UserStateModel } from './state/models/user-state.model';
import { AppSettings } from '../../settings/appsettings.service';
import { DataService } from '../../services/data.service';
import { ToastController } from '@ionic/angular';
import { SieveModel } from 'src/app/models/sieve.model';
import { tap, catchError } from 'rxjs/operators';
import { Sort } from '@angular/material/sort';

@Injectable({
  providedIn: 'root',
})

export class UserService extends CrudServiceBase<User> {
  private readonly _store = new BehaviorSubject<UserStateModel>({
    users: [],
    sorts: 'name',
    filters: '',
    count: 0,
    page: 0,
    pageSize: 10,
    loading: true,
  });

  readonly store$ = this._store.asObservable();

  get store(): UserStateModel {
    return this._store.getValue();
  }

  set store(val: UserStateModel) {
    this._store.next(val);
  }

  get users(): Observable<User[]> {
    return of(this._store.getValue().users);
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
    const { microDayApi, users } = AppSettings.settings.MicroDayUrls;
    return `${microDayApi}/api/${users}`;
  }

  constructor(
    protected readonly dataService: DataService,
    protected readonly toastController: ToastController
  ) {
    super(dataService, toastController);
  }

  getUsers(isLoadMore?: boolean) {
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
          users: data.items,
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

  sortTasks(sort: Sort) {
    const sorts = this.getSort(sort);

    this.store = {
      ...this.store,
      sorts
    };

    this._store.next(this.store);
  }

  filterTasks(filters: string) {
    this.store = {
      ...this.store,
      filters
    };

    this._store.next(this.store);
  }

  updatePageTask(page: number) {
    this.store = {
      ...this.store,
      page
    };

    this._store.next(this.store);
  }
}