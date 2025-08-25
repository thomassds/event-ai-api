export interface IBaseRepository<T> {
  findById(id: string): Promise<T | null>;
  findByIds(ids: string[]): Promise<T[]>;
  findAll(): Promise<T[]>;
  create(data: any): Promise<T>;
  update(id: string, data: any): Promise<T | null>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  softDelete(id: string): Promise<void>;
}
