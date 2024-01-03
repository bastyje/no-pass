import { Mapper } from '../../../domain/common/abstractions/mapper';
import { AttestationOptionsEntity } from './attestation-options.entity';
import { fromBase64, toBase64 } from '../../../utils/b64';

export class AttestationOptionsMapper implements Mapper<AttestationOptionsEntity, PublicKeyCredentialCreationOptions> {
  public toEntity(model: PublicKeyCredentialCreationOptions): AttestationOptionsEntity {
    return <AttestationOptionsEntity> {
      attestation: model.attestation,
      authenticatorSelection: model.authenticatorSelection,
      challenge: toBase64(new Uint8Array(model.challenge as ArrayBuffer)),
      excludeCredentials: model?.excludeCredentials?.map(x => ({
        id: toBase64(x.id as ArrayBuffer),
        transports: x.transports,
        type: x.type
      })),
      extensions: model?.extensions ? {
        prf: model?.extensions?.prf ? {
          eval: model?.extensions.prf.eval ? {
            first: toBase64(model?.extensions?.prf?.eval?.first),
            second: toBase64(model?.extensions?.prf?.eval?.second)
          } : undefined
        } : undefined
      } : undefined
    };
  }

  public toModel(entity: AttestationOptionsEntity): PublicKeyCredentialCreationOptions {
    return <PublicKeyCredentialCreationOptions> {
      attestation: entity.attestation,
      authenticatorSelection: entity.authenticatorSelection,
      challenge: fromBase64(entity.challenge),
      excludeCredentials: entity.excludeCredentials?.map(x => ({
        id: fromBase64(x.id),
        transports: x.transports,
        type: x.type
      })),
      extensions: entity?.extensions ? {
        prf: entity?.extensions?.prf ? {
          eval: entity?.extensions.prf.eval ? {
            first: fromBase64(entity?.extensions?.prf?.eval?.first),
            second: fromBase64(entity?.extensions?.prf?.eval?.second)
          } : undefined
        } : undefined
      } : undefined,
      pubKeyCredParams: entity.pubKeyCredParams,
      rp: entity.rp,
      timeout: entity.timeout,
      user: {
        id: fromBase64(entity.user.id),
        name: entity.user.name,
        displayName: entity.user.displayName
      }
    };
  }

}
