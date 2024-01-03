import { decrypt, encrypt } from '../common/crypto/aes';
import { DecryptedContent, EncryptedContent, isDecryptedContent, isEncryptedContent } from './secret-content-type';
import { map, Observable, of } from 'rxjs';

export class Secret {
  constructor(id: string | null, param: EncryptedContent | DecryptedContent) {
    this.id = id;
    if (isEncryptedContent(param)) {
      this.encrypted = param as EncryptedContent;
    } else if (isDecryptedContent(param)) {
      this.plain = param as DecryptedContent;
    }
  }

  public id: string | null;
  public encrypted: EncryptedContent;
  public plain: DecryptedContent;

  public encrypt(key: CryptoKey): Observable<void> {
    if (this.plain === null) return of(void 0);
    return encrypt(JSON.stringify(this.plain), key).pipe(map(enc => { this.encrypted = enc; }));
  }

  public decrypt(key: CryptoKey): Observable<void> {
    if (this.encrypted === null) return of(void 0);
    return decrypt(this.encrypted, key).pipe(map(dec => this.plain = JSON.parse(dec)));
  }
}
