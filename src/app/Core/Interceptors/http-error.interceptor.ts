import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthenticationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 403 || error.status === 500) {
        authService.logout().subscribe({
          next: (result) => {
            localStorage.removeItem('learn_on_token');
            localStorage.removeItem('learn_on_device_token');
            router.navigate(['/auth/login']);
          },
        });
      }
      return throwError(() => error);
    })
  );
};
