import { HttpException, HttpStatus } from '@nestjs/common';

export enum BusinessErrorCode {
  // Erros de Usuário
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  EMAIL_NOT_VERIFIED = 'EMAIL_NOT_VERIFIED',
  ACCOUNT_INACTIVE = 'ACCOUNT_INACTIVE',
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',

  // Erros de Recursos
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  RESOURCE_ALREADY_EXISTS = 'RESOURCE_ALREADY_EXISTS',

  // Erros de Operação
  INVALID_OPERATION = 'INVALID_OPERATION',
  VALIDATION_FAILED = 'VALIDATION_FAILED',
  BUSINESS_RULE_VIOLATION = 'BUSINESS_RULE_VIOLATION',
  INVALID_STATE = 'INVALID_STATE',
  CONFLICTING_DATA = 'CONFLICTING_DATA',

  // Erros de Sistema
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  MAINTENANCE_MODE = 'MAINTENANCE_MODE',

  // Erros de Autenticação/Autorização
  EXPIRED_TOKEN = 'EXPIRED_TOKEN',
  INVALID_TOKEN = 'INVALID_TOKEN',
  SESSION_EXPIRED = 'SESSION_EXPIRED',

  // Erros de Limitação
  QUOTA_EXCEEDED = 'QUOTA_EXCEEDED',
  FEATURE_DISABLED = 'FEATURE_DISABLED',
}

interface BusinessErrorConfig {
  message: string;
  messageToShow: string;
  statusCode: HttpStatus;
}

const BUSINESS_ERROR_CONFIG: Record<BusinessErrorCode, BusinessErrorConfig> = {
  // Erros de Usuário
  [BusinessErrorCode.USER_NOT_FOUND]: {
    message: 'Usuário não encontrado durante {operation}',
    messageToShow: 'Usuário não encontrado',
    statusCode: HttpStatus.NOT_FOUND,
  },
  [BusinessErrorCode.USER_ALREADY_EXISTS]: {
    message: 'Usuário já existe durante {operation}',
    messageToShow: 'Usuário já existe',
    statusCode: HttpStatus.CONFLICT,
  },
  [BusinessErrorCode.INVALID_CREDENTIALS]: {
    message: 'Credenciais inválidas durante {operation}',
    messageToShow: 'Credenciais inválidas',
    statusCode: HttpStatus.UNAUTHORIZED,
  },
  [BusinessErrorCode.EMAIL_NOT_VERIFIED]: {
    message: 'Email não verificado durante {operation}',
    messageToShow: 'Email não verificado',
    statusCode: HttpStatus.FORBIDDEN,
  },
  [BusinessErrorCode.ACCOUNT_INACTIVE]: {
    message: 'Conta inativa durante {operation}',
    messageToShow: 'Conta inativa',
    statusCode: HttpStatus.FORBIDDEN,
  },
  [BusinessErrorCode.INSUFFICIENT_PERMISSIONS]: {
    message: 'Permissões insuficientes durante {operation}',
    messageToShow: 'Permissões insuficientes',
    statusCode: HttpStatus.FORBIDDEN,
  },

  // Erros de Recursos
  [BusinessErrorCode.RESOURCE_NOT_FOUND]: {
    message: '{resource} não encontrado durante {operation}',
    messageToShow: '{resource} não encontrado',
    statusCode: HttpStatus.NOT_FOUND,
  },
  [BusinessErrorCode.RESOURCE_ALREADY_EXISTS]: {
    message: '{resource} já existe durante {operation}',
    messageToShow: '{resource} já existe',
    statusCode: HttpStatus.CONFLICT,
  },

  // Erros de Operação
  [BusinessErrorCode.INVALID_OPERATION]: {
    message: 'Operação inválida durante {operation}: {reason}',
    messageToShow: 'Operação inválida',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  [BusinessErrorCode.VALIDATION_FAILED]: {
    message: 'Validação falhou durante {operation}: {details}',
    messageToShow: 'Validação falhou',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  [BusinessErrorCode.BUSINESS_RULE_VIOLATION]: {
    message: 'Regra de negócio violada durante {operation}: {rule}',
    messageToShow: 'Regra de negócio violada',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  [BusinessErrorCode.INVALID_STATE]: {
    message: 'Estado inválido durante {operation}: {state}',
    messageToShow: 'Estado inválido',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  [BusinessErrorCode.CONFLICTING_DATA]: {
    message: 'Dados conflitantes durante {operation}: {conflict}',
    messageToShow: 'Dados conflitantes',
    statusCode: HttpStatus.BAD_REQUEST,
  },

  // Erros de Sistema
  [BusinessErrorCode.RATE_LIMIT_EXCEEDED]: {
    message: 'Limite de tentativas excedido durante {operation}',
    messageToShow: 'Limite de tentativas excedido',
    statusCode: HttpStatus.TOO_MANY_REQUESTS,
  },
  [BusinessErrorCode.MAINTENANCE_MODE]: {
    message: 'Sistema em manutenção durante {operation}',
    messageToShow: 'Sistema em manutenção',
    statusCode: HttpStatus.SERVICE_UNAVAILABLE,
  },

  // Erros de Autenticação/Autorização
  [BusinessErrorCode.EXPIRED_TOKEN]: {
    message: 'Token expirado durante {operation}',
    messageToShow: 'Token expirado',
    statusCode: HttpStatus.UNAUTHORIZED,
  },
  [BusinessErrorCode.INVALID_TOKEN]: {
    message: 'Token inválido durante {operation}',
    messageToShow: 'Token inválido',
    statusCode: HttpStatus.UNAUTHORIZED,
  },
  [BusinessErrorCode.SESSION_EXPIRED]: {
    message: 'Sessão expirada durante {operation}',
    messageToShow: 'Sessão expirada',
    statusCode: HttpStatus.UNAUTHORIZED,
  },

  // Erros de Limitação
  [BusinessErrorCode.QUOTA_EXCEEDED]: {
    message: 'Cota excedida durante {operation}',
    messageToShow: 'Cota excedida',
    statusCode: HttpStatus.PAYMENT_REQUIRED,
  },
  [BusinessErrorCode.FEATURE_DISABLED]: {
    message: 'Funcionalidade desabilitada durante {operation}',
    messageToShow: 'Funcionalidade desabilitada',
    statusCode: HttpStatus.FORBIDDEN,
  },
};

export class BusinessException extends HttpException {
  constructor(
    message: string,
    messageToShow: string,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
    public readonly originalError?: any,
  ) {
    super(
      {
        success: false,
        message,
        messageToShow,
        error: 'BusinessError',
        timestamp: new Date().toISOString(),
      },
      statusCode,
    );
  }

  static create(
    errorCode: BusinessErrorCode,
    operation: string,
    params: Record<string, string> = {},
  ): BusinessException {
    const config = BUSINESS_ERROR_CONFIG[errorCode];
    if (!config) {
      throw new Error(`Código de erro não encontrado: ${errorCode}`);
    }

    let message = config.message.replace('{operation}', operation);

    Object.entries(params).forEach(([key, value]) => {
      message = message.replace(`{${key}}`, value);
    });

    return new BusinessException(
      message,
      config.messageToShow,
      config.statusCode,
    );
  }
}
