import { Mapper } from '../../../domain/common/abstractions/mapper';
import { PublicKeyCredentialEntity } from './public-key-credential.entity';
import { fromBase64, toBase64 } from '../../../utils/b64';

export class PublicKeyCredentialMapper implements Mapper<PublicKeyCredentialEntity, PublicKeyCredential> {
  public toEntity(model: PublicKeyCredential): PublicKeyCredentialEntity {
    return <PublicKeyCredentialEntity> {
      id: model.id,
      rawId: toBase64(model.rawId),
      type: model.type,
      authenticatorAttachment: model.authenticatorAttachment,
      response: {
        // @ts-ignore
        attestationObject: toBase64(model.response.attestationObject),
        clientDataJson: toBase64(model.response.clientDataJSON),
        // @ts-ignore
        signature: toBase64(model.response.signature),
        // @ts-ignore
        authenticatorData: toBase64(model.response.authenticatorData),
        // @ts-ignore
        userHandle: model.response.userHandle !== null ? toBase64(model.response.userHandle) : null
      }
    };
  }

  public toModel(entity: PublicKeyCredentialEntity): PublicKeyCredential {
    return <PublicKeyCredential> {
      id: entity.id,
      rawId: fromBase64(entity.rawId),
      type: entity.type,
      authenticatorAttachment: entity.authenticatorAttachment,
      response: {
        attestationObject: fromBase64(entity.response.attestationObject),
        clientDataJSON: fromBase64(entity.response.clientDataJson)
      },
      getClientExtensionResults(): any {}
    };
  }

}
