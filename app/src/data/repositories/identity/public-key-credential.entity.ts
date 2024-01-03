export type PublicKeyCredentialEntity = {
  id: string;
  rawId: string;
  type: 'public-key';
  authenticatorAttachment: AuthenticatorAttachment;
  response: {
    attestationObject: string;
    clientDataJson: string;
    signature: string;
    authenticatorData: string;
    userHandle?: string;
  }
}
