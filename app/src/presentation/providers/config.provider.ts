import { APP_INITIALIZER, EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { ConfigService } from '../services/config.service';

export const provideConfig = (): EnvironmentProviders => makeEnvironmentProviders([
  ConfigService,
  {
    provide: APP_INITIALIZER,
    deps: [ConfigService],
    multi: true,
    useFactory: (service: ConfigService) => () => service.init()
  }
]);
