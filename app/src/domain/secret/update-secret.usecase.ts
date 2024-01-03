import { UseCase } from '../common/abstractions/use-case';
import { Secret } from './secret';
import { NoContentServiceResponse } from '../../models/service-response.model';
import { mergeMap, Observable } from 'rxjs';
import { InMemoryStorage } from '../../data/storage/in-memory.storage';
import { ISecretRepository } from '../common/abstractions/i-secret.repository';
import { MasterKey } from '../common/crypto/master-key';

export class UpdateSecret implements UseCase<Secret, NoContentServiceResponse> {
  constructor(private secrets: ISecretRepository, private storage: InMemoryStorage) {}

  public execute(param: Secret): Observable<NoContentServiceResponse> {
    return this.storage.get<CryptoKey>(MasterKey).pipe(mergeMap(key =>
      param.encrypt(key).pipe(mergeMap(_ => this.secrets.update(param)))
    ));
  }
}
