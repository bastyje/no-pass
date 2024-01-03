import { IIdentityRepository } from '../../../domain/common/abstractions/i-identity.repository';
import { map, Observable } from 'rxjs';
import { NoContentServiceResponse, ServiceResponse } from '../../../models/service-response.model';
import { RegistrationData } from '../../../domain/identity/registration-data';
import { HttpService } from '../../../presentation/services/http.service';
import { LoginData } from '../../../domain/identity/login-data';
import { AttestationOptionsEntity } from './attestation-options.entity';
import { AttestationOptionsMapper } from './attestation-options.mapper';
import { PublicKeyCredentialMapper } from './public-key-credential.mapper';
import { AssertionOptionsMapper } from './assertion-options.mapper';
import { LoginResponse } from '../../../domain/identity/login.response';
import { fromBase64, toBase64, toUrlBase64 } from '../../../utils/b64';

export class IdentityRepository implements IIdentityRepository {

  private readonly _baseUri: 'identity' = 'identity';
  private readonly attestationMapper: AttestationOptionsMapper = new AttestationOptionsMapper();
  private readonly assertionMapper: AssertionOptionsMapper = new AssertionOptionsMapper();

  private readonly publicKeyCredentialMapper: PublicKeyCredentialMapper = new PublicKeyCredentialMapper();

  constructor(private http: HttpService) {}

  public login(assertionResponse: PublicKeyCredential, loginData: LoginData): Observable<ServiceResponse<LoginResponse>> {
    return this.http.post<any, {userId: string, keyDerivationSalt: string}>(
      `${this._baseUri}/login`,
      {
        authenticatorResponse: this.publicKeyCredentialMapper.toEntity(assertionResponse),
        loginId: loginData.loginId,
        encryptedKey: toBase64(loginData.encryptedKey)
      }
    ).pipe(map(r => ({
      content: {
        keyDerivationSalt: fromBase64(r.content.keyDerivationSalt),
        userId: r.content.userId
      },
      errorMessages: r.errorMessages,
      success: r.success
    })));
  }

  public register(attestationResponse: PublicKeyCredential, registrationData: RegistrationData): Observable<NoContentServiceResponse> {
    return this.http.post<any, never>(
      `${this._baseUri}/register`,
      {
        authenticatorResponse: this.publicKeyCredentialMapper.toEntity(attestationResponse),
        loginId: registrationData.loginId
      }
    );
  }
  public getEncryptedKey(rawId: ArrayBuffer): Observable<ServiceResponse<{key: ArrayBuffer | null, iv: ArrayBuffer}>> {
    console.log(toUrlBase64(rawId));
    return this.http.get<any>(`${this._baseUri}/credential/${toUrlBase64(rawId)}/encryptedKey`).pipe(map(r => ({
      content: {
        key: r.content.key === null ? null : fromBase64(r.content.key),
        iv: fromBase64(r.content.iv)
      },
      errorMessages: r.errorMessages,
      success: r.success
    })))
  }

  public storeEncryptedKey(encryptedKey: ArrayBuffer, iv: ArrayBuffer, rawId: ArrayBuffer): Observable<NoContentServiceResponse> {
    return this.http.put(`${this._baseUri}/storeEncryptedKey`, {
      encryptedKey: toBase64(encryptedKey),
      iv: toBase64(iv),
      rawId: toBase64(rawId)
    });
  }

  public getAssertionOptions(loginData: LoginData): Observable<ServiceResponse<PublicKeyCredentialRequestOptions>> {
    return this.http.post<LoginData, any>(
      `${this._baseUri}/webauthn/assertion/options`,
      loginData
    ).pipe(map(r => ({
      content: this.assertionMapper.toModel(r.content),
      errorMessages: r.errorMessages,
      success: r.success
    })));
  }

  public getAttestationOptions(registrationData: RegistrationData): Observable<ServiceResponse<PublicKeyCredentialCreationOptions>> {
    return this.http.post<RegistrationData, AttestationOptionsEntity>(
      `${this._baseUri}/webauthn/attestation/options`,
      registrationData
    ).pipe(map(r => ({
      content: this.attestationMapper.toModel(r.content),
      errorMessages: r.errorMessages,
      success: r.success
    })));
  }
}
