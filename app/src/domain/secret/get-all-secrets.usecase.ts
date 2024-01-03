import { UseCase } from '../common/abstractions/use-case';
import { ISecretRepository } from '../common/abstractions/i-secret.repository';
import { ServiceResponse } from '../../models/service-response.model';
import { Secret } from './secret';
import { forkJoin, map, mergeMap, Observable } from 'rxjs';
import { InMemoryStorage } from '../../data/storage/in-memory.storage';
import { MasterKey } from '../common/crypto/master-key';

export class GetAllSecrets implements UseCase<void, ServiceResponse<Secret[]>> {
  constructor(private secretRepository: ISecretRepository, private storage: InMemoryStorage) {}

  public execute(): Observable<ServiceResponse<Secret[]>> {
    return this.storage.get<CryptoKey>(MasterKey).pipe(mergeMap(key =>
      this.secretRepository.getAll().pipe(mergeMap((x: ServiceResponse<Secret[]>) => {
        const decrypts$ = x.content.map(s => s.decrypt(key));
        return forkJoin(decrypts$).pipe(map(_ => x));
      }))
    ));
  }
}
