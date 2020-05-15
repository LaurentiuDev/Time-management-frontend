import { HttpParams } from '@angular/common/http';

export class HttpUtils {
  static getHttpParameters(object: object): HttpParams {
    let httpParams = new HttpParams();
    for (const property in object) {
      if (object.hasOwnProperty(property) && object[property]) {
        httpParams = httpParams.set(property, object[property]);
      }
    }
    return httpParams;
  }
}