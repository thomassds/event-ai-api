import { IsString, IsEmail, IsOptional, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: 'Nome deve ter pelo menos 2 caracteres' })
  @MaxLength(100, { message: 'Nome deve ter no máximo 100 caracteres' })
  name: string;

  @IsEmail({}, { message: 'Email deve ser um email válido' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Senha deve ter pelo menos 8 caracteres' })
  @MaxLength(50, { message: 'Senha deve ter no máximo 50 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número',
  })
  password: string;

  @IsOptional()
  @IsString()
  @MaxLength(20, { message: 'Telefone deve ter no máximo 20 caracteres' })
  @Matches(/^[\d\s\-\+\(\)]+$/, { message: 'Telefone deve conter apenas números, espaços, hífens, parênteses e +' })
  phone?: string;
}
