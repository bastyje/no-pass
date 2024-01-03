import { ISecretRepository } from '../../../domain/common/abstractions/i-secret.repository';
import { Secret } from '../../../domain/secret/secret';
import { HttpService } from '../../../presentation/services/http.service';
import { map, Observable } from 'rxjs';
import { ServiceResponse } from '../../../models/service-response.model';
import { SecretMapper } from './secret.mapper';
import { SecretEntity } from './secret.entity';
import { IdModel } from '../../../domain/common/id.model';

export class SecretRepository implements ISecretRepository {
  constructor(private http: HttpService) {}

  private endpoint: string = 'secret';
  private mapper: SecretMapper = new SecretMapper();

  public getAll(): Observable<ServiceResponse<Secret[]>> {
    return this.http
      .get<SecretEntity[]>(this.endpoint)
      .pipe(map(x => (<ServiceResponse<Secret[]>>{
        content: x.content.map(this.mapper.toModel),
        success: x.success,
        errorMessages: x.errorMessages
      })));
  }

  public getById(id: string): Observable<ServiceResponse<Secret>> {
    return this.http.get<SecretEntity>(`${this.endpoint}/${id}`).pipe(map(x => (<ServiceResponse<Secret>> {
      content: this.mapper.toModel(x.content),
      success: x.success,
      errorMessages: x.errorMessages
    })));
  }

  public create(secret: Secret): Observable<ServiceResponse<IdModel>> {
    return this.http.post(this.endpoint, this.mapper.toEntity(secret));
  }

  public update(secret: Secret): Observable<ServiceResponse<IdModel>> {
    return this.http.put(this.endpoint, this.mapper.toEntity(secret));
  }
}
