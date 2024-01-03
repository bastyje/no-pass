import { Observable } from 'rxjs';
import { StorageUpdate } from '../../../data/storage/storage-update';

export type Storage = {
  get change$(): Observable<StorageUpdate>;
  get<T>(key: string): Observable<T>;
  set<T>(key: string, obj: T): Observable<void>;
  remove<T>(key: string): Observable<boolean>;
}
