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
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Дмитрий Рогозин', description: 'Имя пользователя' })
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'name@none.com', description: 'Почта' })
  @IsEmail({}, { message: 'некорректная почта' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty({ example: 'pass', description: 'Пароль' })
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
