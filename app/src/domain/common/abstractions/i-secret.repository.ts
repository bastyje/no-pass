import { Secret } from '../../secret/secret';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../../../models/service-response.model';
import { IdModel } from '../id.model';

export type ISecretRepository = {
  getAll(): Observable<ServiceResponse<Secret[]>>;
  getById(id: string): Observable<ServiceResponse<Secret>>;
  create(secret: Secret): Observable<ServiceResponse<IdModel>>;
  update(secret: Secret): Observable<ServiceResponse<IdModel>>;
}
