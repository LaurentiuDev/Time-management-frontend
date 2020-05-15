import { Injectable } from '@angular/core';
import StaticSettings from './StaticSettings';
import Settings from './Settings';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppSettings {
  public static settings: StaticSettings;

  constructor(public http: HttpClient) { }

  /**
  * Retrieve the config
  */
  public load(): Promise<any> {
    return new Promise<Settings>((resolve, reject) => {
      this.http
        .get('/assets/appsettings.json')
        .toPromise()
        .then(
          (response: Settings) => {
            AppSettings.settings = {
              MicroDayUrls: response.MicroDayUrls,
            };

            resolve(response);
          },
          (err) => {
            reject(`Could not load appsettings: ${JSON.stringify(err)}`);
          }
        );
    });
  }
}
