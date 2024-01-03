import { Observable } from 'rxjs';
import { StorageUpdate } from './storage-update';
import { Storage } from '../../domain/common/abstractions/storage';

export abstract class AbstractStorage implements Storage {
  public abstract get change$(): Observable<StorageUpdate>;

  public abstract get<T>(key: string): Observable<T>;
  public abstract set<T>(key: string, obj: T): Observable<void>;
  public abstract remove<T>(key: string): Observable<boolean>;
}
