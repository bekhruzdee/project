import { IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateModuleDto {
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  courseId?: number;
}
