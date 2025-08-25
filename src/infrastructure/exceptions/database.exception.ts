import { HttpException, HttpStatus } from '@nestjs/common';

export class DatabaseException extends HttpException {
  constructor(
    message: string,
    statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    public readonly originalError?: any,
  ) {
    super(
      {
        success: false,
        message,
        error: 'DatabaseError',
        timestamp: new Date().toISOString(),
      },
      statusCode,
    );
  }

  static fromError(error: any, operation: string): DatabaseException {
    const errorMessage = this.getErrorMessage(error, operation);
    const statusCode = this.getStatusCode(error);
    
    return new DatabaseException(errorMessage, statusCode, error);
  }

  private static getErrorMessage(error: any, operation: string): string {
    if (error.code === '23505') {
      return `Dados duplicados encontrados durante ${operation}`;
    }
    
    if (error.code === '23503') {
      return `Violação de chave estrangeira durante ${operation}`;
    }
    
    if (error.code === '23502') {
      return `Campo obrigatório não informado durante ${operation}`;
    }
    
    if (error.code === '42P01') {
      return `Tabela não encontrada durante ${operation}`;
    }
    
    if (error.code === '42703') {
      return `Coluna não encontrada durante ${operation}`;
    }
    
    if (error.code === '23514') {
      return `Violação de constraint durante ${operation}`;
    }
    
    if (error.code === '08000') {
      return `Erro de conexão com banco de dados durante ${operation}`;
    }
    
    if (error.code === '57014') {
      return `Operação cancelada durante ${operation}`;
    }
    
    if (error.code === '25P02') {
      return `Transação em estado inválido durante ${operation}`;
    }
    
    return `Erro inesperado no banco de dados durante ${operation}`;
  }

  private static getStatusCode(error: any): HttpStatus {
    if (error.code === '23505') {
      return HttpStatus.CONFLICT;
    }
    
    if (error.code === '23503') {
      return HttpStatus.BAD_REQUEST;
    }
    
    if (error.code === '23502') {
      return HttpStatus.BAD_REQUEST;
    }
    
    if (error.code === '42P01' || error.code === '42703') {
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
    
    if (error.code === '23514') {
      return HttpStatus.BAD_REQUEST;
    }
    
    if (error.code === '08000') {
      return HttpStatus.SERVICE_UNAVAILABLE;
    }
    
    if (error.code === '57014') {
      return HttpStatus.REQUEST_TIMEOUT;
    }
    
    if (error.code === '25P02') {
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
    
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
