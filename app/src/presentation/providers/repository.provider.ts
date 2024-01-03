import { Provider } from '@angular/core';
import { HttpService } from '../services/http.service';
import { SecretRepository } from '../../data/repositories/secret/secret.repository';
import { IdentityRepository } from '../../data/repositories/identity/identity.repository';

export const provideRepositories = (): Provider[] => [
  {
    deps: [ HttpService ],
    provide: SecretRepository,
    useFactory: (http: HttpService) => new SecretRepository(http),
  },
  {
    deps: [ HttpService ],
    provide: IdentityRepository,
    useFactory: (http: HttpService) => new IdentityRepository(http),
  },
];
