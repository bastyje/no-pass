import { AbstractStorage } from './abstract.storage';
import { Observable, of, Subject } from 'rxjs';
import { StorageUpdate } from './storage-update';

export class InMemoryStorage extends AbstractStorage {
  constructor() {
    super();
    this._state = new Map<string, unknown>();
    this._changeSubject = new Subject<StorageUpdate>();
  }

  protected _state: Map<string, unknown>;
  private _changeSubject: Subject<StorageUpdate>

  public get change$(): Observable<StorageUpdate> {
    return this._changeSubject.asObservable();
  }

  public get<T>(key: string): Observable<T> {
    return this._state.has(key)
      ? of(this._state.get(key) as T)
      : of(null as T);
  }

  public remove(key: string): Observable<boolean> {
    const deleted = this._state.delete(key);
    if (deleted) {
      this._changeSubject.next({ type: 'remove', key })
    }

    return of(deleted);
  }

  public set<T>(key: string, obj: T): Observable<void> {
    const create = this._state.has(key);
    this._state.set(key, obj);
    this._changeSubject.next({type: create ? 'create' : 'update', key});
    return of(void 0);
  }
}
