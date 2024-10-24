import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class QueryDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  search?: string;
}
