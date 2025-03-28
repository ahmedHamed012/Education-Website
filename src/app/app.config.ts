import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { loaderInterceptor } from './Core/Interceptors/loader.interceptor';
import { MessageService } from 'primeng/api';
import { httpErrorInterceptor } from './Core/Interceptors/http-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([loaderInterceptor, httpErrorInterceptor])
    ),
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    MessageService,
    provideAnimations(),
  ],
};
