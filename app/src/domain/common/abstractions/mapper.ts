export interface Mapper<TEntity, TModel> {
  toModel(entity: TEntity): TModel;
  toEntity(model: TModel): TEntity;
}
