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

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  description?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  slug?: string;

  @IsOptional()
  @IsUrl({ require_protocol: false })
  thumbnail?: string;

  @IsOptional()
  @IsUrl({ require_protocol: false })
  banner?: string;

  @IsOptional()
  @IsDateString()
  startAt?: Date;

  @IsOptional()
  @IsDateString()
  endAt?: Date;

  @IsOptional()
  @IsDateString()
  startSaleAt?: Date;

  @IsOptional()
  @IsDateString()
  endSaleAt?: Date;

  @IsOptional()
  @IsDateString()
  openDoorAt?: Date;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @IsOptional()
  @IsUrl({ require_protocol: false })
  showWebsite?: string;

  @IsOptional()
  @IsEnum(EventStatus)
  status?: EventStatus;
}
