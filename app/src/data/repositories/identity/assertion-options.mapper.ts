import { Mapper } from '../../../domain/common/abstractions/mapper';
import { AssertionOptionsEntity } from './assertion-options.entity';
import { fromBase64, toBase64 } from '../../../utils/b64';

export class AssertionOptionsMapper implements Mapper<AssertionOptionsEntity, PublicKeyCredentialRequestOptions> {
  public toEntity(model: PublicKeyCredentialRequestOptions): AssertionOptionsEntity {
    return <AssertionOptionsEntity> {
      allowCredentials: model.allowCredentials?.map(c => ({
        id: toBase64(c.id as ArrayBuffer),
        transports: c.transports,
        type: c.type
      })),
      challenge: toBase64(model.challenge as ArrayBuffer),
      extensions: model?.extensions ? {
        prf: model?.extensions?.prf ? {
          eval: model?.extensions.prf.eval ? {
            first: toBase64(model?.extensions?.prf?.eval?.first),
            second: toBase64(model?.extensions?.prf?.eval?.second)
          } : undefined
        } : undefined
      } : undefined,
      rpId: model.rpId,
      timeout: model.timeout,
      userVerification: model.userVerification
    };
  }

  public toModel(entity: AssertionOptionsEntity): PublicKeyCredentialRequestOptions {
    return <PublicKeyCredentialRequestOptions> {
      allowCredentials: entity.allowCredentials?.map(c => ({
        id: fromBase64(c.id),
        transports: c.transports,
        type: c.type
      })),
      challenge: fromBase64(entity.challenge),
      extensions: entity?.extensions ? {
        prf: entity?.extensions?.prf ? {
          eval: entity?.extensions.prf.eval ? {
            first: fromBase64(entity?.extensions?.prf?.eval?.first),
            // second: fromBase64(entity?.extensions?.prf?.eval?.second)
          } : undefined
        } : undefined
      } : undefined,
      rpId: entity.rpId,
      timeout: entity.timeout,
      userVerification: entity.userVerification
    };
  }
}
