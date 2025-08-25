import {
  IsString,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsUrl,
  IsDateString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { EventStatus } from '../../domain/entities/event.entity';

export class CreateEventDto {
  @IsString()
  @MinLength(3, { message: 'Nome deve ter pelo menos 3 caracteres' })
  @MaxLength(255, { message: 'Nome deve ter no máximo 255 caracteres' })
  name: string;

  @IsString()
  @MinLength(10, { message: 'Descrição deve ter pelo menos 10 caracteres' })
  description: string;

  @IsString()
  @MinLength(3, { message: 'Slug deve ter pelo menos 3 caracteres' })
  @MaxLength(255, { message: 'Slug deve ter no máximo 255 caracteres' })
  slug: string;

  @IsOptional()
  @IsUrl(
    { require_protocol: false },
    { message: 'Thumbnail deve ser uma URL válida' },
  )
  thumbnail?: string;

  @IsOptional()
  @IsUrl(
    { require_protocol: false },
    { message: 'Banner deve ser uma URL válida' },
  )
  banner?: string;

  @IsDateString({}, { message: 'startAt deve ser uma data válida' })
  startAt: string;

  @IsDateString({}, { message: 'endAt deve ser uma data válida' })
  endAt: string;

  @IsDateString({}, { message: 'startSaleAt deve ser uma data válida' })
  startSaleAt: string;

  @IsDateString({}, { message: 'endSaleAt deve ser uma data válida' })
  endSaleAt: string;

  @IsOptional()
  @IsDateString({}, { message: 'openDoorAt deve ser uma data válida' })
  openDoorAt?: string;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @IsOptional()
  @IsUrl(
    { require_protocol: false },
    { message: 'showWebsite deve ser uma URL válida' },
  )
  showWebsite?: string;

  @IsOptional()
  @IsEnum(EventStatus, { message: 'status inválido' })
  status?: EventStatus;
}
