import { HttpStatus } from '@nestjs/common';
import { BusinessException, BusinessErrorCode } from './business.exception';

describe('BusinessException', () => {
  describe('constructor', () => {
    it('should create exception with default status code', () => {
      const exception = new BusinessException('Test error');

      expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      expect(exception.getResponse()).toEqual({
        success: false,
        message: 'Test error',
        error: 'BusinessError',
        timestamp: expect.any(String),
      });
    });

    it('should create exception with custom status code', () => {
      const exception = new BusinessException(
        'Test error',
        HttpStatus.NOT_FOUND,
      );

      expect(exception.getStatus()).toBe(HttpStatus.NOT_FOUND);
      expect(exception.getResponse()).toEqual({
        success: false,
        message: 'Test error',
        error: 'BusinessError',
        timestamp: expect.any(String),
      });
    });

    it('should store original error', () => {
      const originalError = new Error('Original error');
      const exception = new BusinessException(
        'Test error',
        HttpStatus.BAD_REQUEST,
        originalError,
      );

      expect(exception.originalError).toBe(originalError);
    });
  });

  describe('static methods', () => {
    it('should create userNotFound exception', () => {
      const exception = BusinessException.userNotFound('buscar usuário');

      expect(exception.getStatus()).toBe(HttpStatus.NOT_FOUND);
      expect(exception.getResponse()).toEqual({
        success: false,
        message: 'Usuário não encontrado durante buscar usuário',
        error: 'BusinessError',
        timestamp: expect.any(String),
      });
    });

    it('should create userAlreadyExists exception', () => {
      const exception = BusinessException.userAlreadyExists('criar usuário');

      expect(exception.getStatus()).toBe(HttpStatus.CONFLICT);
      expect(exception.getResponse()).toEqual({
        success: false,
        message: 'Usuário já existe durante criar usuário',
        error: 'BusinessError',
        timestamp: expect.any(String),
      });
    });

    it('should create invalidCredentials exception', () => {
      const exception = BusinessException.invalidCredentials('login');

      expect(exception.getStatus()).toBe(HttpStatus.UNAUTHORIZED);
      expect(exception.getResponse()).toEqual({
        success: false,
        message: 'Credenciais inválidas durante login',
        error: 'BusinessError',
        timestamp: expect.any(String),
      });
    });

    it('should create emailNotVerified exception', () => {
      const exception = BusinessException.emailNotVerified('acessar recurso');

      expect(exception.getStatus()).toBe(HttpStatus.FORBIDDEN);
      expect(exception.getResponse()).toEqual({
        success: false,
        message: 'Email não verificado durante acessar recurso',
        error: 'BusinessError',
        timestamp: expect.any(String),
      });
    });

    it('should create accountInactive exception', () => {
      const exception = BusinessException.accountInactive('login');

      expect(exception.getStatus()).toBe(HttpStatus.FORBIDDEN);
      expect(exception.getResponse()).toEqual({
        success: false,
        message: 'Conta inativa durante login',
        error: 'BusinessError',
        timestamp: expect.any(String),
      });
    });

    it('should create insufficientPermissions exception', () => {
      const exception =
        BusinessException.insufficientPermissions('deletar usuário');

      expect(exception.getStatus()).toBe(HttpStatus.FORBIDDEN);
      expect(exception.getResponse()).toEqual({
        success: false,
        message: 'Permissões insuficientes durante deletar usuário',
        error: 'BusinessError',
        timestamp: expect.any(String),
      });
    });

    it('should create resourceNotFound exception', () => {
      const exception = BusinessException.resourceNotFound(
        'Produto',
        'buscar produto',
      );

      expect(exception.getStatus()).toBe(HttpStatus.NOT_FOUND);
      expect(exception.getResponse()).toEqual({
        success: false,
        message: 'Produto não encontrado durante buscar produto',
        error: 'BusinessError',
        timestamp: expect.any(String),
      });
    });

    it('should create resourceAlreadyExists exception', () => {
      const exception = BusinessException.resourceAlreadyExists(
        'Categoria',
        'criar categoria',
      );

      expect(exception.getStatus()).toBe(HttpStatus.CONFLICT);
      expect(exception.getResponse()).toEqual({
        success: false,
        message: 'Categoria já existe durante criar categoria',
        error: 'BusinessError',
        timestamp: expect.any(String),
      });
    });

    it('should create invalidOperation exception', () => {
      const exception = BusinessException.invalidOperation(
        'atualizar pedido',
        'Pedido já finalizado',
      );

      expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      expect(exception.getResponse()).toEqual({
        success: false,
        message:
          'Operação inválida durante atualizar pedido: Pedido já finalizado',
        error: 'BusinessError',
        timestamp: expect.any(String),
      });
    });

    it('should create validationFailed exception', () => {
      const exception = BusinessException.validationFailed(
        'criar pedido',
        'Quantidade inválida',
      );

      expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      expect(exception.getResponse()).toEqual({
        success: false,
        message: 'Validação falhou durante criar pedido: Quantidade inválida',
        error: 'BusinessError',
        timestamp: expect.any(String),
      });
    });

    it('should create rateLimitExceeded exception', () => {
      const exception = BusinessException.rateLimitExceeded('enviar email');

      expect(exception.getStatus()).toBe(HttpStatus.TOO_MANY_REQUESTS);
      expect(exception.getResponse()).toEqual({
        success: false,
        message: 'Limite de tentativas excedido durante enviar email',
        error: 'BusinessError',
        timestamp: expect.any(String),
      });
    });

    it('should create maintenanceMode exception', () => {
      const exception = BusinessException.maintenanceMode('acessar sistema');

      expect(exception.getStatus()).toBe(HttpStatus.SERVICE_UNAVAILABLE);
      expect(exception.getResponse()).toEqual({
        success: false,
        message: 'Sistema em manutenção durante acessar sistema',
        error: 'BusinessError',
        timestamp: expect.any(String),
      });
    });
  });

  describe('create method', () => {
    it('should create exception with USER_NOT_FOUND code', () => {
      const exception = BusinessException.create(
        BusinessErrorCode.USER_NOT_FOUND,
        'buscar usuário'
      );

      expect(exception.getStatus()).toBe(HttpStatus.NOT_FOUND);
      expect(exception.getResponse()).toEqual({
        success: false,
        message: 'Usuário não encontrado durante buscar usuário',
        error: 'BusinessError',
        timestamp: expect.any(String),
      });
    });

    it('should create exception with RESOURCE_NOT_FOUND code and params', () => {
      const exception = BusinessException.create(
        BusinessErrorCode.RESOURCE_NOT_FOUND,
        'buscar produto',
        { resource: 'Produto' }
      );

      expect(exception.getStatus()).toBe(HttpStatus.NOT_FOUND);
      expect(exception.getResponse()).toEqual({
        success: false,
        message: 'Produto não encontrado durante buscar produto',
        error: 'BusinessError',
        timestamp: expect.any(String),
      });
    });

    it('should create exception with INVALID_OPERATION code and params', () => {
      const exception = BusinessException.create(
        BusinessErrorCode.INVALID_OPERATION,
        'atualizar pedido',
        { reason: 'Pedido já finalizado' }
      );

      expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      expect(exception.getResponse()).toEqual({
        success: false,
        message: 'Operação inválida durante atualizar pedido: Pedido já finalizado',
        error: 'BusinessError',
        timestamp: expect.any(String),
      });
    });

    it('should throw error for invalid error code', () => {
      expect(() => {
        BusinessException.create('INVALID_CODE' as BusinessErrorCode, 'operacao');
      }).toThrow('Código de erro não encontrado: INVALID_CODE');
    });
  });
});
