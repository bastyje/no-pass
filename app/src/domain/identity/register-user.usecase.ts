import { UseCase } from '../common/abstractions/use-case';
import { RegistrationData } from './registration-data';
import { NoContentServiceResponse } from '../../models/service-response.model';
import { from, mergeMap, Observable, throwError } from 'rxjs';
import { IIdentityRepository } from '../common/abstractions/i-identity.repository';

export class RegisterUser implements UseCase<RegistrationData, NoContentServiceResponse> {

  constructor(private identity: IIdentityRepository) {}

  public execute(param: RegistrationData): Observable<NoContentServiceResponse> {
    return this.identity.getAttestationOptions(param).pipe(mergeMap(options =>
      options.success
        ? from(navigator.credentials.create({
          publicKey: options.content
        })).pipe(mergeMap((cr) => {
          const credential = cr as PublicKeyCredential;
          return credential === null
            ? throwError(() => {})
            : this.identity.register(credential, param)
        }))
        : throwError(() => (<NoContentServiceResponse>{
          errorMessages: options.errorMessages,
          success: options.success
        }))
    ));
  }
}
