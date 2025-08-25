import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ValidationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof BadRequestException) {
          const response = error.getResponse() as any;
          
          if (response.message && Array.isArray(response.message)) {
            const formattedErrors = response.message.map((error: any) => ({
              field: error.property,
              message: error.constraints ? Object.values(error.constraints)[0] : error.message,
            }));

            return throwError(() => new BadRequestException({
              success: false,
              message: 'Dados inválidos',
              errors: formattedErrors,
            }));
          }
        }
        
        return throwError(() => error);
      }),
    );
  }
}
