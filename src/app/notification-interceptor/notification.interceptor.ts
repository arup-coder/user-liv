import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { NotificationComponent } from '../notification-component/notification.component';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {
  constructor(public notification: NotificationComponent) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      tap(
        event => {
          if (event instanceof HttpResponse && event.status !== 200) {
            const message = this.getSuccessMessage(event);
            this.notification.openSnackBar(message, 'Close', 'green-snackbar');
          }
        },
        error => {
          const message = this.getErrorMessage(error);
          this.notification.openSnackBar(message, 'Ok', 'red-snackbar');
          error.message = message;
          return throwError(error);
        },
      ),
    );
  }

  getSuccessMessage(event: HttpResponse<any>) {
    if (event.status === 201) {
      return 'Created Successfully';
    } else if (event.status === 204) {
      return 'Updated Successfully';
    } else if (event.status === 404) {
      return 'Upload Successfully';
    } else if (event.status === 200) {
      return 'Removed Successfully';
    }
  }
  getErrorMessage(error: HttpErrorResponse) {
    const customErrorMessage = 'An error has occurred. Please contact your system administrator.';
    if (error.status !== 405 && error.error) {
      return error.error.error ? error.error.error : customErrorMessage;
    }
    return customErrorMessage;
  }
}
