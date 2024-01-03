import { Observable } from 'rxjs';

export interface UseCase<TRequest, TResult> {
  execute(param: TRequest): Observable<TResult>;
}
