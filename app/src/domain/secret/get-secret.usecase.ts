import { UseCase } from '../common/abstractions/use-case';
import { Secret } from './secret';
import { map, mergeMap, Observable } from 'rxjs';
import { ServiceResponse } from '../../models/service-response.model';
import { InMemoryStorage } from '../../data/storage/in-memory.storage';
import { ISecretRepository } from '../common/abstractions/i-secret.repository';
import { MasterKey } from '../common/crypto/master-key';

export class GetSecret implements UseCase<string, ServiceResponse<Secret>> {
  constructor(private secrets: ISecretRepository, private storage: InMemoryStorage) {}

  public execute(param: string): Observable<ServiceResponse<Secret>> {
    return this.storage.get<CryptoKey>(MasterKey).pipe(mergeMap(key =>
      this.secrets.getById(param).pipe(mergeMap((x: ServiceResponse<Secret>) =>
        x.content.decrypt(key).pipe(map(_ => x))
      ))
    ));
  }
}
