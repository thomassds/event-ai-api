import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { User } from '../../../../domain/entities/user.entity';
import { IUserRepository } from '../../../../domain/repositories/user.repository.interface';
import { DatabaseException } from '../../../exceptions';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async findById(id: string): Promise<User | null> {
    try {
      return await this.repository.findOne({ where: { id } });
    } catch (error) {
      throw DatabaseException.fromError(error, 'buscar usuário por ID');
    }
  }

  async findByIds(ids: string[]): Promise<User[]> {
    if (ids.length === 0) return [];
    try {
      return await this.repository.find({ where: { id: In(ids) } });
    } catch (error) {
      throw DatabaseException.fromError(error, 'buscar usuários por IDs');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.repository.find();
    } catch (error) {
      throw DatabaseException.fromError(error, 'buscar todos os usuários');
    }
  }

  async create(data: any): Promise<User> {
    try {
      return await this.repository.save(data);
    } catch (error) {
      throw DatabaseException.fromError(error, 'criar usuário');
    }
  }

  async update(id: string, data: any): Promise<User | null> {
    try {
      await this.repository.update(id, data);
      return await this.findById(id);
    } catch (error) {
      throw DatabaseException.fromError(error, 'atualizar usuário');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.repository.delete(id);
    } catch (error) {
      throw DatabaseException.fromError(error, 'deletar usuário');
    }
  }

  async exists(id: string): Promise<boolean> {
    try {
      const count = await this.repository.count({ where: { id } });
      return count > 0;
    } catch (error) {
      throw DatabaseException.fromError(
        error,
        'verificar existência de usuário',
      );
    }
  }

  async softDelete(id: string): Promise<void> {
    try {
      await this.repository.update({ id }, { deletedAt: new Date() });
    } catch (error) {
      throw DatabaseException.fromError(error, 'soft delete de usuário');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.repository.findOne({
        where: { email },
        select: [
          'id',
          'name',
          'email',
          'phone',
          'emailVerified',
          'profile',
          'createdAt',
          'updatedAt',
          'isActive',
        ],
      });
    } catch (error) {
      throw DatabaseException.fromError(error, 'buscar usuário por email');
    }
  }

  async findByEmailWithPassword(email: string): Promise<User | null> {
    try {
      return await this.repository.findOne({
        where: { email },
        select: [
          'id',
          'name',
          'email',
          'password',
          'phone',
          'emailVerified',
          'profile',
          'createdAt',
          'updatedAt',
          'isActive',
        ],
      });
    } catch (error) {
      throw DatabaseException.fromError(
        error,
        'buscar usuário por email com senha',
      );
    }
  }

  async findActiveUsers(): Promise<User[]> {
    try {
      return await this.repository.find({
        where: { isActive: true },
        select: [
          'id',
          'name',
          'email',
          'phone',
          'emailVerified',
          'createdAt',
          'updatedAt',
        ],
      });
    } catch (error) {
      throw DatabaseException.fromError(error, 'buscar usuários ativos');
    }
  }

  async verifyEmail(userId: string): Promise<void> {
    try {
      await this.repository.update(userId, { emailVerified: true });
    } catch (error) {
      throw DatabaseException.fromError(error, 'verificar email do usuário');
    }
  }
}
