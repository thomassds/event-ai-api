import { IsString, MinLength, MaxLength } from 'class-validator';

export class GetEventBySlugParamsDto {
  @IsString()
  @MinLength(3, { message: 'Slug deve ter pelo menos 3 caracteres' })
  @MaxLength(255, { message: 'Slug deve ter no máximo 255 caracteres' })
  slug: string;
}
