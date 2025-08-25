import { Repository, In, ObjectLiteral } from 'typeorm';
import { IBaseRepository } from '../../../domain/repositories/base.repository.interface';
import { DatabaseException } from '../../exceptions';

export class BaseRepository<T extends ObjectLiteral>
  implements IBaseRepository<T>
{
  constructor(protected readonly repository: Repository<T>) {}

  async findById(id: string): Promise<T | null> {
    try {
      return await this.repository.findOne({ where: { id } as any });
    } catch (error) {
      throw DatabaseException.fromError(error, 'buscar por ID');
    }
  }

  async findByIds(ids: string[]): Promise<T[]> {
    if (ids.length === 0) return [];
    try {
      return await this.repository.find({ where: { id: In(ids) } as any });
    } catch (error) {
      throw DatabaseException.fromError(error, 'buscar por IDs');
    }
  }

  async findAll(): Promise<T[]> {
    try {
      return await this.repository.find();
    } catch (error) {
      throw DatabaseException.fromError(error, 'buscar todos');
    }
  }

  async create(data: any): Promise<T> {
    try {
      return (await this.repository.save(data)) as T;
    } catch (error) {
      throw DatabaseException.fromError(error, 'criar registro');
    }
  }

  async update(id: string, data: any): Promise<T | null> {
    try {
      await this.repository.update(id as any, data);
      return await this.findById(id);
    } catch (error) {
      throw DatabaseException.fromError(error, 'atualizar registro');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.repository.delete(id as any);
    } catch (error) {
      throw DatabaseException.fromError(error, 'deletar registro');
    }
  }

  async exists(id: string): Promise<boolean> {
    try {
      const count = await this.repository.count({ where: { id } as any });
      return count > 0;
    } catch (error) {
      throw DatabaseException.fromError(error, 'verificar existência');
    }
  }

  async softDelete(id: string): Promise<void> {
    try {
      await this.repository.update(
        { id } as any,
        { deletedAt: new Date() } as any,
      );
    } catch (error) {
      throw DatabaseException.fromError(error, 'soft delete de registro');
    }
  }
}
