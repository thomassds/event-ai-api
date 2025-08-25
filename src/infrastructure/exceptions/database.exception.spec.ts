import { HttpStatus } from '@nestjs/common';
import { DatabaseException } from './database.exception';

describe('DatabaseException', () => {
  describe('constructor', () => {
    it('should create exception with default status code', () => {
      const exception = new DatabaseException('Test error');

      expect(exception.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(exception.getResponse()).toEqual({
        success: false,
        message: 'Test error',
        error: 'DatabaseError',
        timestamp: expect.any(String),
      });
    });

    it('should create exception with custom status code', () => {
      const exception = new DatabaseException(
        'Test error',
        HttpStatus.BAD_REQUEST,
      );

      expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      expect(exception.getResponse()).toEqual({
        success: false,
        message: 'Test error',
        error: 'DatabaseError',
        timestamp: expect.any(String),
      });
    });

    it('should store original error', () => {
      const originalError = new Error('Original error');
      const exception = new DatabaseException(
        'Test error',
        HttpStatus.BAD_REQUEST,
        originalError,
      );

      expect(exception.originalError).toBe(originalError);
    });
  });

  describe('fromError', () => {
    it('should handle duplicate key error', () => {
      const error = { code: '23505', message: 'Duplicate entry' };
      const exception = DatabaseException.fromError(error, 'criar usuário');

      expect(exception.getStatus()).toBe(HttpStatus.CONFLICT);
      expect(exception.getResponse()).toEqual({
        success: false,
        message: 'Dados duplicados encontrados durante criar usuário',
        error: 'DatabaseError',
        timestamp: expect.any(String),
      });
    });

    it('should handle foreign key error', () => {
      const error = { code: '23503', message: 'Foreign key violation' };
      const exception = DatabaseException.fromError(error, 'atualizar usuário');

      expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      expect(exception.getResponse()).toEqual({
        success: false,
        message: 'Violação de chave estrangeira durante atualizar usuário',
        error: 'DatabaseError',
        timestamp: expect.any(String),
      });
    });

    it('should handle not null constraint error', () => {
      const error = { code: '23502', message: 'Not null constraint' };
      const exception = DatabaseException.fromError(error, 'criar usuário');

      expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      expect(exception.getResponse()).toEqual({
        success: false,
        message: 'Campo obrigatório não informado durante criar usuário',
        error: 'DatabaseError',
        timestamp: expect.any(String),
      });
    });

    it('should handle table not found error', () => {
      const error = { code: '42P01', message: 'Table not found' };
      const exception = DatabaseException.fromError(error, 'buscar usuário');

      expect(exception.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(exception.getResponse()).toEqual({
        success: false,
        message: 'Tabela não encontrada durante buscar usuário',
        error: 'DatabaseError',
        timestamp: expect.any(String),
      });
    });

    it('should handle column not found error', () => {
      const error = { code: '42703', message: 'Column not found' };
      const exception = DatabaseException.fromError(error, 'buscar usuário');

      expect(exception.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(exception.getResponse()).toEqual({
        success: false,
        message: 'Coluna não encontrada durante buscar usuário',
        error: 'DatabaseError',
        timestamp: expect.any(String),
      });
    });

    it('should handle constraint violation error', () => {
      const error = { code: '23514', message: 'Check constraint' };
      const exception = DatabaseException.fromError(error, 'criar usuário');

      expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      expect(exception.getResponse()).toEqual({
        success: false,
        message: 'Violação de constraint durante criar usuário',
        error: 'DatabaseError',
        timestamp: expect.any(String),
      });
    });

    it('should handle connection error', () => {
      const error = { code: '08000', message: 'Connection failed' };
      const exception = DatabaseException.fromError(error, 'buscar usuário');

      expect(exception.getStatus()).toBe(HttpStatus.SERVICE_UNAVAILABLE);
      expect(exception.getResponse()).toEqual({
        success: false,
        message: 'Erro de conexão com banco de dados durante buscar usuário',
        error: 'DatabaseError',
        timestamp: expect.any(String),
      });
    });

    it('should handle operation cancelled error', () => {
      const error = { code: '57014', message: 'Operation cancelled' };
      const exception = DatabaseException.fromError(error, 'buscar usuário');

      expect(exception.getStatus()).toBe(HttpStatus.REQUEST_TIMEOUT);
      expect(exception.getResponse()).toEqual({
        success: false,
        message: 'Operação cancelada durante buscar usuário',
        error: 'DatabaseError',
        timestamp: expect.any(String),
      });
    });

    it('should handle invalid transaction state error', () => {
      const error = { code: '25P02', message: 'Invalid transaction state' };
      const exception = DatabaseException.fromError(error, 'criar usuário');

      expect(exception.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(exception.getResponse()).toEqual({
        success: false,
        message: 'Transação em estado inválido durante criar usuário',
        error: 'DatabaseError',
        timestamp: expect.any(String),
      });
    });

    it('should handle unknown error', () => {
      const error = { code: '99999', message: 'Unknown error' };
      const exception = DatabaseException.fromError(error, 'buscar usuário');

      expect(exception.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(exception.getResponse()).toEqual({
        success: false,
        message: 'Erro inesperado no banco de dados durante buscar usuário',
        error: 'DatabaseError',
        timestamp: expect.any(String),
      });
    });

    it('should handle error without code', () => {
      const error = { message: 'Generic error' };
      const exception = DatabaseException.fromError(error, 'criar usuário');

      expect(exception.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(exception.getResponse()).toEqual({
        success: false,
        message: 'Erro inesperado no banco de dados durante criar usuário',
        error: 'DatabaseError',
        timestamp: expect.any(String),
      });
    });
  });
});
