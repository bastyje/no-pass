export type AttestationOptionsEntity = {
  attestation?: AttestationConveyancePreference;
  authenticatorSelection?: AuthenticatorSelectionCriteria;
  challenge: string;
  excludeCredentials?: {
    id: string,
    transports?: AuthenticatorTransport[];
    type: PublicKeyCredentialType;
  }[];
  extensions?: {
    prf: {
      eval: {
        first: string;
        second: string;
      };
    };
  };
  pubKeyCredParams: PublicKeyCredentialParameters[];
  rp: PublicKeyCredentialRpEntity;
  timeout?: number;
  user: {
    id: string;
    name: string;
    displayName: string;
  }
}
