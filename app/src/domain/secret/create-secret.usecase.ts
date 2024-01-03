import { UseCase } from '../common/abstractions/use-case';
import { Secret } from './secret';
import { ServiceResponse } from '../../models/service-response.model';
import { IdModel } from '../common/id.model';
import { mergeMap, Observable } from 'rxjs';
import { ISecretRepository } from '../common/abstractions/i-secret.repository';
import { InMemoryStorage } from '../../data/storage/in-memory.storage';
import { MasterKey } from '../common/crypto/master-key';

export class CreateSecret implements UseCase<Secret, ServiceResponse<IdModel>> {
  constructor(private secrets: ISecretRepository, private storage: InMemoryStorage) {}

  public execute(param: Secret): Observable<ServiceResponse<IdModel>> {
    return this.storage.get<CryptoKey>(MasterKey).pipe(mergeMap(key =>
      param.encrypt(key).pipe(mergeMap(_ => this.secrets.create(param)))
    ));
  }
}
