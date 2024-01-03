import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { provideConfig } from './providers/config.provider';
import { provideUseCases } from './providers/use-case.provider';
import { provideStorage } from './providers/storage.provider';
import { provideRepositories } from './providers/repository.provider';
import { unauthorizedInterceptor } from './interceptors/unauthorized.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([ unauthorizedInterceptor ]),
    ),
    provideConfig(),
    provideRepositories(),
    provideUseCases(),
    provideStorage(),
  ],
};
