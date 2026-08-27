import { IsInt } from 'class-validator';
import { CreateTagDto } from './create-tag.dto';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';

export class UpdateTagDto extends PartialType(CreateTagDto) {
  @Type(() => Number)
  @IsInt()
  id: number;
}
