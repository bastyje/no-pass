import { Mapper } from '../../../domain/common/abstractions/mapper';
import { SecretEntity } from './secret.entity';
import { Secret } from '../../../domain/secret/secret';
import { fromBase64, toBase64 } from '../../../utils/b64';

export class SecretMapper implements Mapper<SecretEntity, Secret> {
  public toEntity(model: Secret): SecretEntity {
    const enc = model.encrypted;
    if (enc === null) return <SecretEntity>{};

    return <SecretEntity>{
      id: model.id,
      content: toBase64(enc.content),
      iv: toBase64(enc.iv)
    }
  }

  public toModel(entity: SecretEntity): Secret {
    return new Secret(entity.id, {
      content: fromBase64(entity.content),
      iv: fromBase64(entity.iv)
    });
  }
}
