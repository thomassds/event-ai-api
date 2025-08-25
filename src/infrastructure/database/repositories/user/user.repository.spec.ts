import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from './user.repository';
import { User } from '../../../../domain/entities/user.entity';
import { DatabaseException } from '../../../exceptions';

describe('UserRepository', () => {
  let repository: UserRepository;
  let mockRepository: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const mockRepositoryMethods = {
      findOne: jest.fn(),
      find: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepositoryMethods,
        },
      ],
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
    mockRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findById', () => {
    it('should return user when found', async () => {
      const mockUser = {
        id: '1',
        name: 'João Silva',
        email: 'joao@example.com',
      } as User;
      mockRepository.findOne.mockResolvedValue(mockUser);

      const result = await repository.findById('1');

      expect(result).toEqual(mockUser);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should return null when user not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      const result = await repository.findById('1');

      expect(result).toBeNull();
    });

    it('should throw DatabaseException when database error occurs', async () => {
      const databaseError = new Error('Connection failed');
      databaseError['code'] = '08000';
      mockRepository.findOne.mockRejectedValue(databaseError);

      await expect(repository.findById('1')).rejects.toThrow(DatabaseException);
    });
  });

  describe('create', () => {
    it('should create user successfully', async () => {
      const userData = {
        name: 'João Silva',
        email: 'joao@example.com',
        password: 'Senha123',
      };
      const mockUser = { id: '1', ...userData } as User;
      mockRepository.save.mockResolvedValue(mockUser);

      const result = await repository.create(userData);

      expect(result).toEqual(mockUser);
      expect(mockRepository.save).toHaveBeenCalledWith(userData);
    });

    it('should throw DatabaseException when duplicate email', async () => {
      const userData = {
        name: 'João Silva',
        email: 'joao@example.com',
        password: 'Senha123',
      };
      const duplicateError = new Error('Duplicate entry');
      duplicateError['code'] = '23505';
      mockRepository.save.mockRejectedValue(duplicateError);

      await expect(repository.create(userData)).rejects.toThrow(
        DatabaseException,
      );
    });
  });

  describe('update', () => {
    it('should update user successfully', async () => {
      const updateData = { name: 'João Silva Updated' };
      const mockUser = {
        id: '1',
        name: 'João Silva Updated',
        email: 'joao@example.com',
      } as User;

      mockRepository.update.mockResolvedValue({ affected: 1 } as any);
      mockRepository.findOne.mockResolvedValue(mockUser);

      const result = await repository.update('1', updateData);

      expect(result).toEqual(mockUser);
      expect(mockRepository.update).toHaveBeenCalledWith('1', updateData);
    });

    it('should throw DatabaseException when update fails', async () => {
      const updateData = { name: 'João Silva Updated' };
      const updateError = new Error('Update failed');
      updateError['code'] = '23502';
      mockRepository.update.mockRejectedValue(updateError);

      await expect(repository.update('1', updateData)).rejects.toThrow(
        DatabaseException,
      );
    });
  });

  describe('delete', () => {
    it('should delete user successfully', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 } as any);

      await expect(repository.delete('1')).resolves.not.toThrow();
      expect(mockRepository.delete).toHaveBeenCalledWith('1');
    });

    it('should throw DatabaseException when delete fails', async () => {
      const deleteError = new Error('Delete failed');
      deleteError['code'] = '23503';
      mockRepository.delete.mockRejectedValue(deleteError);

      await expect(repository.delete('1')).rejects.toThrow(DatabaseException);
    });
  });

  describe('findByEmail', () => {
    it('should return user when found by email', async () => {
      const mockUser = {
        id: '1',
        name: 'João Silva',
        email: 'joao@example.com',
      } as User;
      mockRepository.findOne.mockResolvedValue(mockUser);

      const result = await repository.findByEmail('joao@example.com');

      expect(result).toEqual(mockUser);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'joao@example.com' },
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
    });

    it('should return null when email not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      const result = await repository.findByEmail('joao@example.com');

      expect(result).toBeNull();
    });
  });

  describe('findActiveUsers', () => {
    it('should return active users', async () => {
      const mockUsers = [
        {
          id: '1',
          name: 'João Silva',
          email: 'joao@example.com',
          isActive: true,
        },
        {
          id: '2',
          name: 'Maria Silva',
          email: 'maria@example.com',
          isActive: true,
        },
      ] as User[];

      mockRepository.find.mockResolvedValue(mockUsers);

      const result = await repository.findActiveUsers();

      expect(result).toEqual(mockUsers);
      expect(mockRepository.find).toHaveBeenCalledWith({
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
    });
  });
});
