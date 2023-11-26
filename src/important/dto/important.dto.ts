import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class ImportantDto {
  @IsNotEmpty()
  @IsString()
  readonly author: string;
  @IsNotEmpty()
  @IsString()
  readonly recipient: string;
  @IsNotEmpty()
  @IsString()
  readonly title: string;
  @IsNotEmpty()
  @IsString()
  readonly description: string;
  @IsNotEmpty()
  @IsBoolean()
  readonly isImportant: boolean;
}
