import { Provider } from '@angular/core';
import { InMemoryStorage } from '../../data/storage/in-memory.storage';

export const provideStorage = (): Provider[] => [
  {
    provide: InMemoryStorage,
    useClass: InMemoryStorage
  }
]
