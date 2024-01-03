import { Provider } from '@angular/core';
import { GetAllSecrets } from '../../domain/secret/get-all-secrets.usecase';
import { SecretRepository } from '../../data/repositories/secret/secret.repository';
import { CreateSecret } from '../../domain/secret/create-secret.usecase';
import { InMemoryStorage } from '../../data/storage/in-memory.storage';
import { IdentityRepository } from '../../data/repositories/identity/identity.repository';
import { RegisterUser } from '../../domain/identity/register-user.usecase';
import { LoginUser } from '../../domain/identity/login-user.usecase';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GetSecret } from '../../domain/secret/get-secret.usecase';
import { UpdateSecret } from '../../domain/secret/update-secret.usecase';

export const provideUseCases = (): Provider[] => [
  {
    deps: [SecretRepository, InMemoryStorage],
    provide: GetAllSecrets,
    useFactory: (secrets: SecretRepository, storage: InMemoryStorage) => new GetAllSecrets(secrets, storage)
  },
  {
    deps: [SecretRepository, InMemoryStorage],
    provide: CreateSecret,
    useFactory: (secrets: SecretRepository, storage: InMemoryStorage) => new CreateSecret(secrets, storage)
  },
  {
    deps: [SecretRepository, InMemoryStorage],
    provide: UpdateSecret,
    useFactory: (secrets: SecretRepository, storage: InMemoryStorage) => new UpdateSecret(secrets, storage)
  },
  {
    deps: [SecretRepository, InMemoryStorage],
    provide: GetSecret,
    useFactory: (secrets: SecretRepository, storage: InMemoryStorage) => new GetSecret(secrets, storage)
  },
  {
    deps: [IdentityRepository],
    provide: RegisterUser,
    useFactory: (identity: IdentityRepository) => new RegisterUser(identity)
  },
  {
    deps: [IdentityRepository, AuthService, Router, ActivatedRoute, InMemoryStorage],
    provide: LoginUser,
    useFactory: (identity: IdentityRepository, auth: AuthService, router: Router, route: ActivatedRoute, storage: InMemoryStorage) =>
      new LoginUser(identity, auth, router, route, storage)
  }
]
