import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  get<T>(url: string): Observable<HttpResponse<T>> {
    return this.http.get<T>(url, { observe: 'response' });
  }

  post<T>(url: string, data: any): Observable<HttpResponse<T>> {
    return this.http.post<T>(url, data, { observe: 'response' });
  }

  put<T>(url: string, data: any): Observable<HttpResponse<T>> {
    return this.http.put<T>(url, data, { observe: 'response' });
  }

  delete<T>(url: string, data?: any): Observable<HttpResponse<T>> {
    return this.http.request<T>('delete', url, { body: data, observe: 'response' });
  }
}