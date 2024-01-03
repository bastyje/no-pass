import { Observable } from 'rxjs';
import { NoContentServiceResponse, ServiceResponse } from '../../../models/service-response.model';
import { RegistrationData } from '../../identity/registration-data';
import { LoginData } from '../../identity/login-data';
import { LoginResponse } from '../../identity/login.response';

export type IIdentityRepository = {
  getAttestationOptions(registrationData: RegistrationData): Observable<ServiceResponse<PublicKeyCredentialCreationOptions>>;
  getAssertionOptions(loginData: LoginData): Observable<ServiceResponse<PublicKeyCredentialRequestOptions>>;
  register(attestationResponse: PublicKeyCredential, registrationData: RegistrationData): Observable<NoContentServiceResponse>;
  login(assertionResponse: PublicKeyCredential, loginData: LoginData): Observable<ServiceResponse<LoginResponse>>;
  getEncryptedKey(rawId: ArrayBuffer): Observable<ServiceResponse<{key: ArrayBuffer | null, iv: ArrayBuffer}>>;
  storeEncryptedKey(encryptedKey: ArrayBuffer, iv: ArrayBuffer, rawId: ArrayBuffer): Observable<NoContentServiceResponse>;
}
