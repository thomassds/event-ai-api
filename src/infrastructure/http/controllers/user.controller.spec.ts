import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { CreateUserUseCase } from '../../../application/useCases/user/createUser.useCase';
import { CreateUserDto } from '../../../interfaces/dtos';

describe('UserController', () => {
  let controller: UserController;
  let createUserUseCase: CreateUserUseCase;

  const mockCreateUserUseCase = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: CreateUserUseCase,
          useValue: mockCreateUserUseCase,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      const createUserDto: CreateUserDto = {
        name: 'João Silva',
        email: 'joao@example.com',
        password: 'Senha123',
        phone: '+55 11 99999-9999',
      };

      const expectedResponse = {
        id: '1',
        name: 'João Silva',
        email: 'joao@example.com',
        emailVerified: false,
        createdAt: new Date(),
      };

      mockCreateUserUseCase.execute.mockResolvedValue(expectedResponse);

      const result = await controller.createUser(createUserDto);

      expect(result).toEqual({
        success: true,
        data: expectedResponse,
        message: 'User created successfully',
      });
      expect(createUserUseCase.execute).toHaveBeenCalledWith(createUserDto);
    });

    it('should handle errors when creating user fails', async () => {
      const createUserDto: CreateUserDto = {
        name: 'João Silva',
        email: 'joao@example.com',
        password: 'Senha123',
      };

      const errorMessage = 'Email already exists';
      mockCreateUserUseCase.execute.mockRejectedValue(new Error(errorMessage));

      await expect(controller.createUser(createUserDto)).rejects.toThrow();
    });
  });
});
