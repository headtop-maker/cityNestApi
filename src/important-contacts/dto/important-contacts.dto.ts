import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class ImportantContactsDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Водоканал',
    description: 'имя контакта',
  })
  readonly contactName: string;
  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ example: ['+79527873361', '8(313)252525'] })
  readonly contacts: string[];
}
