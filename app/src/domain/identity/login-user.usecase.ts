import { UseCase } from '../common/abstractions/use-case';
import { LoginData } from './login-data';
import { NoContentServiceResponse } from '../../models/service-response.model';
import { from, map, mergeMap, Observable, tap, throwError } from 'rxjs';
import { AuthStorage } from '../../data/storage/auth.storage';
import { ActivatedRoute, Router } from '@angular/router';
import { IIdentityRepository } from '../common/abstractions/i-identity.repository';
import { InMemoryStorage } from '../../data/storage/in-memory.storage';
import { decrypt, decryptRaw, encrypt, encryptRaw, getKey, SALT } from '../common/crypto/aes';
import { MasterKey } from '../common/crypto/master-key';

// todo to clean architecture: remove ng dependencies
export class LoginUser implements UseCase<LoginData, NoContentServiceResponse> {
  constructor(
    private identity: IIdentityRepository,
    private auth: AuthStorage,
    private router: Router,
    private route: ActivatedRoute,
    private storage: InMemoryStorage
  ) {
  }

  public execute(param: LoginData): Observable<NoContentServiceResponse> {
    return this.identity.getAssertionOptions(param).pipe(tap(console.log), mergeMap(options =>
      options.success
        ? from(navigator.credentials.get({
          publicKey: options.content
        })).pipe(mergeMap(credential =>
          credential !== null
            ? this.identity.login(credential as PublicKeyCredential, param).pipe(map(response => {
              console.log(response);
              console.log(credential);
              if (response.success) {
                this.auth.signIn();
                if (this.auth.isSignedIn()) {
                  const extensions = (credential as PublicKeyCredential).getClientExtensionResults();
                  if (extensions?.prf?.results?.first !== undefined) {
                    getKey(extensions.prf.results.first, SALT).subscribe(key => {
                      this.identity.getEncryptedKey((credential as PublicKeyCredential).rawId).subscribe(r => {
                        if (r.content.key !== null) {
                          decryptRaw({content: r.content.key, iv: r.content.iv}, key).subscribe(dec => {
                            console.log(dec);
                            from(crypto.subtle.importKey(
                              'raw',
                              dec,
                              'AES-GCM',
                              false,
                              ['encrypt', 'decrypt']
                            )).subscribe(keeey => {
                              this.storage.set(MasterKey, keeey).subscribe({
                                next: _ => this.storage.get(MasterKey).subscribe(k => {
                                  console.log(key);
                                })
                              });
                            })
                          })
                        } else {
                          const material = crypto.getRandomValues(new Uint8Array(32));
                          const salt = crypto.getRandomValues(new Uint8Array(32));
                          console.log(material);
                          console.log(salt);
                          getKey(material, salt).subscribe(keeey => {
                            console.log(keeey);
                            crypto.subtle.exportKey('raw', keeey).then(exp => {
                              console.log(exp);
                              encryptRaw(exp, key).subscribe(enc => {
                                this.identity.storeEncryptedKey(enc.content, enc.iv, (credential as PublicKeyCredential).rawId).subscribe()
                              })
                              this.storage.set(MasterKey, keeey).subscribe({
                                next: _ => this.storage.get(MasterKey).subscribe(k => {
                                  console.log(key);
                                })
                              });
                            });
                          })
                        }
                      });
                    });
                  }
                  this.router.navigate([ this.route.snapshot.queryParams['redirectUrl'] || '/' ]).then();
                } else {
                  this.auth.signOut();
                }
              }
              return <NoContentServiceResponse>{
                errorMessages: response.errorMessages,
                success: response.success
              };
            }))
            // todo handle
            : throwError(() => {
            })
        ))
        : throwError(() => (<NoContentServiceResponse>{
          errorMessages: options.errorMessages,
          success: options.success
        }))
    ));
  }
}
