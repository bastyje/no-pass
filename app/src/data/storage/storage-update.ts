export type StorageUpdate = {
  type: 'create' | 'update' | 'remove';
  key: string;
}
