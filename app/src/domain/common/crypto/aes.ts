import { CipherText } from './cipher-text.model';
import { from, map, Observable } from 'rxjs';

const ALGORITHM: 'AES-GCM' = 'AES-GCM';
export const  SALT: Uint8Array = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4]);

export const encrypt = (plainText: string, key: CryptoKey): Observable<CipherText> => {
  console.log(key);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = crypto.subtle.encrypt({
    name: ALGORITHM,
    iv
  }, key, new TextEncoder().encode(plainText));

  return from(encrypted).pipe(map(enc => ({ iv, content: enc })));
}

export const encryptRaw = (plainText: ArrayBuffer, key: CryptoKey): Observable<CipherText> => {
  console.log(key);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = crypto.subtle.encrypt({
    name: ALGORITHM,
    iv
  }, key, plainText);

  return from(encrypted).pipe(map(enc => ({ iv, content: enc })));
}

export const decrypt = (cipherText: CipherText, key: CryptoKey): Observable<string> => {
  const decrypted = crypto.subtle.decrypt({
    name: ALGORITHM,
    iv: cipherText.iv
  }, key, cipherText.content)

  return from(decrypted).pipe(map(dec => new TextDecoder().decode(dec)));
}

export const decryptRaw = (cipherText: CipherText, key: CryptoKey): Observable<ArrayBuffer> => {
  const decrypted = crypto.subtle.decrypt({
    name: ALGORITHM,
    iv: cipherText.iv
  }, key, cipherText.content)

  return from(decrypted).pipe(map(dec => dec));
}

export const getKey = (material: ArrayBuffer, salt: ArrayBuffer): Observable<CryptoKey> => {
  return from(crypto.subtle.importKey(
    'raw',
    material,
    'HKDF',
    false,
    ['deriveKey']
  ).then(baseKey => crypto.subtle.deriveKey({
    name: 'HKDF',
    hash: 'SHA-512',
    salt: salt,
    info: new Uint8Array()
  }, baseKey, {
    name: ALGORITHM,
    length: 256
  }, true, ['encrypt', 'decrypt'])));
}
