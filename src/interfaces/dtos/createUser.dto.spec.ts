import { validate } from 'class-validator';
import { CreateUserDto } from './createUser.dto';

describe('CreateUserDto', () => {
  describe('name validation', () => {
    it('should pass with valid name', async () => {
      const dto = new CreateUserDto();
      dto.name = 'João Silva';
      dto.email = 'joao@example.com';
      dto.password = 'Senha123';

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should fail with name too short', async () => {
      const dto = new CreateUserDto();
      dto.name = 'A';
      dto.email = 'joao@example.com';
      dto.password = 'Senha123';

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints?.minLength).toBeDefined();
    });

    it('should fail with name too long', async () => {
      const dto = new CreateUserDto();
      dto.name = 'A'.repeat(101);
      dto.email = 'joao@example.com';
      dto.password = 'Senha123';

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints?.maxLength).toBeDefined();
    });
  });

  describe('email validation', () => {
    it('should pass with valid email', async () => {
      const dto = new CreateUserDto();
      dto.name = 'João Silva';
      dto.email = 'joao@example.com';
      dto.password = 'Senha123';

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should fail with invalid email', async () => {
      const dto = new CreateUserDto();
      dto.name = 'João Silva';
      dto.email = 'invalid-email';
      dto.password = 'Senha123';

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints?.isEmail).toBeDefined();
    });
  });

  describe('password validation', () => {
    it('should pass with valid password', async () => {
      const dto = new CreateUserDto();
      dto.name = 'João Silva';
      dto.email = 'joao@example.com';
      dto.password = 'Senha123';

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should fail with password too short', async () => {
      const dto = new CreateUserDto();
      dto.name = 'João Silva';
      dto.email = 'joao@example.com';
      dto.password = 'Senha1';

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints?.minLength).toBeDefined();
    });

    it('should fail with password without uppercase', async () => {
      const dto = new CreateUserDto();
      dto.name = 'João Silva';
      dto.email = 'joao@example.com';
      dto.password = 'senha123';

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints?.matches).toBeDefined();
    });

    it('should fail with password without lowercase', async () => {
      const dto = new CreateUserDto();
      dto.name = 'João Silva';
      dto.email = 'joao@example.com';
      dto.password = 'SENHA123';

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints?.matches).toBeDefined();
    });

    it('should fail with password without number', async () => {
      const dto = new CreateUserDto();
      dto.name = 'João Silva';
      dto.email = 'joao@example.com';
      dto.password = 'SenhaABC';

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints?.matches).toBeDefined();
    });
  });

  describe('phone validation', () => {
    it('should pass with valid phone', async () => {
      const dto = new CreateUserDto();
      dto.name = 'João Silva';
      dto.email = 'joao@example.com';
      dto.password = 'Senha123';
      dto.phone = '+55 11 99999-9999';

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should pass without phone (optional)', async () => {
      const dto = new CreateUserDto();
      dto.name = 'João Silva';
      dto.email = 'joao@example.com';
      dto.password = 'Senha123';

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should fail with invalid phone format', async () => {
      const dto = new CreateUserDto();
      dto.name = 'João Silva';
      dto.email = 'joao@example.com';
      dto.password = 'Senha123';
      dto.phone = 'invalid-phone@#$%';

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints?.matches).toBeDefined();
    });
  });
});
