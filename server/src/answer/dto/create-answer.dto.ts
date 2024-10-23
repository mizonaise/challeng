import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAnswerDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  questionId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;
}
