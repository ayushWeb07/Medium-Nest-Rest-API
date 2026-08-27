import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class DeleteTagDto {
  @Type(() => Number)
  @IsInt()
  id: number;
}
