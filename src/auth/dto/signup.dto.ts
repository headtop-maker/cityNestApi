import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from '../schemas/user.schema';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'некорректная почта' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  readonly banned: boolean;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(UserRole, { message: 'Введите роль корректно' })
  readonly userRole: UserRole;
}
