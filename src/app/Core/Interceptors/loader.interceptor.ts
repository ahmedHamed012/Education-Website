import { LoadingService } from '../Services/loader.service';
import {
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';

import { catchError, finalize, map, tap, throwError } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.setLoading(true, req.url);

  return next(req).pipe(
    finalize(() => loadingService.setLoading(false, req.url)),
    catchError((error) => {
      console.error('HTTP Error:', error);
      return throwError(() => error);
    })
  );
};
