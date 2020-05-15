import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Task } from 'src/app/models/task.model';
import { DataService } from 'src/app/shared/services/data.service';
import { CrudServiceBase } from 'src/app/shared/services/crud.service.base';
import { AppSettings } from 'src/app/shared/settings/appsettings.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { TaskStateModel } from './state/models/task-state.model';
import { ActivatedRoute } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { SieveModel } from 'src/app/models/sieve.model';
import { Sort } from '@angular/material/sort';

@Injectable({
  providedIn: 'root',
})

export class TaskService extends CrudServiceBase<Task> {
  private readonly _store = new BehaviorSubject<TaskStateModel>({
    tasks: [],
    sorts: 'name',
    filters: '',
    count: 0,
    page: 0,
    pageSize: 10,
    loading: true,
  });

  readonly store$ = this._store.asObservable();

  get store(): TaskStateModel {
    return this._store.getValue();
  }

  set store(val: TaskStateModel) {
    this._store.next(val);
  }

  get tasks(): Observable<Task[]> {
    return of(this._store.getValue().tasks);
  }

  get count(): Observable<number> {
    return of(this._store.getValue().count);
  }

  get loading(): Observable<boolean> {
    return of(this._store.getValue().loading);
  }

  get page(): Observable<number> {
    return of(this._store.getValue().page);
  }

  get pageSize(): Observable<number> {
    return of(this._store.getValue().pageSize);
  }

  get sorts(): Observable<string> {
    return of(this._store.getValue().sorts);
  }

  get filters(): Observable<string> {
    return of(this._store.getValue().filters);
  }

  get url(): string {
    const { microDayApi, tasks } = AppSettings.settings.MicroDayUrls;
    return `${microDayApi}/api/${tasks}`;
  }

  constructor(
    protected readonly dataService: DataService,
    protected readonly toastController: ToastController,
    protected readonly route: ActivatedRoute
  ) {
    super(dataService, toastController);
  }

  getTasks() {
    const sieveModel: SieveModel = this.getSieveModel(this.store);

    return this.getAll(sieveModel).pipe(
      tap((data) => {
        this.store = {
          ...this.store,
          tasks: data.items,
          count: data.count,
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

  addTask(task: Task) {
    return this.add(task).pipe(
      tap((data) => {
        this.getTasks().subscribe();
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

  updateTask(task: Task) {
    return this.update(task).pipe(
      tap((data) => {
        this.getTasks().subscribe();
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

  deleteTask(id: string) {
    return this.delete(id).pipe(
      tap((data) => {
        if (!data) {
          return;
        }

        const tasks = this.store.tasks.filter((i) => i.id !== id);
        this.store = {
          ...this.store,
          tasks
        };
        this._store.next(this.store);

        this.getTasks().subscribe();
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