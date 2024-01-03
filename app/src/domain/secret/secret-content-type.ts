import { CipherText } from '../common/crypto/cipher-text.model';

export type EncryptedContent = CipherText;

const inObject = (keys: string[], obj: any): boolean => keys.map(key => key in obj).every(x => x);

const encryptedContentKeys: Array<keyof EncryptedContent> = ['content', 'iv'];
export const isEncryptedContent = (obj: any): boolean => inObject(encryptedContentKeys, obj);

export type DecryptedContent = {
  name: string;
  websiteAddress: string;
  loginId: string;
  password: string;
  notes: string;
};

const decryptedContentKeys: Array<keyof DecryptedContent> = ['name', 'websiteAddress', 'loginId', 'password', 'notes'];
export const isDecryptedContent = (obj: any): boolean => inObject(decryptedContentKeys, obj);
