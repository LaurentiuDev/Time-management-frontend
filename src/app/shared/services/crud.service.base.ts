import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from './data.service';
import { SieveModel } from 'src/app/models/sieve.model';
import { PagedGridResponse } from 'src/app/models/response.model';
import { ModelBase } from 'src/app/models/model.base';
import { IdResult } from 'src/app/models/idresult.model';
import { ToastController } from '@ionic/angular';
import { HttpUtils } from '../utils/http.util';
import { PagedGridStateBase } from '../states/paged-grid.state';

export abstract class CrudServiceBase<T extends ModelBase> extends PagedGridStateBase {
  constructor(protected readonly dataService: DataService, protected readonly toastController: ToastController) {
    super();
  }

  /**
   * @returns Endpoint URL. Containing the root + route.
   */
  abstract get url(): string;

  getAll(params: SieveModel = null): Observable<PagedGridResponse<T>> {
    const parameters = HttpUtils.getHttpParameters(params);
    const url = `${this.url}?${parameters}`;

    return this.dataService.get<T[]>(url).pipe(
      map((response) => {
        const count = response.headers.get('X-Total-Count');
        return { items: response.body, count: Number(count) };
      }),
    );
  }

  // tslint:disable-next-line: no-shadowed-variable
  get<T>(id: string): Observable<T> {
    const url = `${this.url}/${id}`;
    return this.dataService.get<T>(url).pipe(
      map((response) => response.body),
    );
  }

  add(item: T): Observable<IdResult> {
    const url = this.url;
    return this.dataService.post<IdResult>(url, item).pipe(map((response) => response.body));
  }

  update(item: T): Observable<IdResult> {
    const url = `${this.url}/${item.id}`;
    return this.dataService.put<IdResult>(url, item).pipe(map((response) => response.body));
  }

  delete(id: string, data: any = null): Observable<boolean> {
    const url = `${this.url}/${id}`;
    return this.dataService.delete<boolean>(url, data).pipe(map((response) => response.status === 204));
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 5000,
      color: 'success',
      buttons: [
        {
          text: 'Close',
          role: 'cancel'
        }
      ],
    }).then(t => t.present());
  }
}
