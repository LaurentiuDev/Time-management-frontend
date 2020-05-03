import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(public snackBar: MatSnackBar, public toastController: ToastController) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        let message: string;

        switch (errorResponse.status) {
          case 400:
            message = 'http.badRequestError';
            break;
          case 401:
            message = 'http.unauthorizedError';
            break;
          case 403:
            message = 'Invalid data, please try again.';
            break;
          case 404:
            message = 'http.notFoundError';
            break;
          case 409:
            message = errorResponse.error.error;
            break;
          case 500:
            message = 'http.internalServerError';
            break;
          default:
            message = 'http.defaultError';
        }

        this.showToast(message);

        const error = errorResponse.error || errorResponse.statusText;
        return throwError(error);
      })
    );
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 5000,
      color: 'danger',
      buttons: [
        {
          text: 'Close',
          role: 'cancel'
        }
      ],
    }).then(t => t.present());
  }
}
