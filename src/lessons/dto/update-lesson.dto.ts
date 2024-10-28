import { IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateLessonDto {
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  content?: string;

  @IsOptional()
  moduleId?: number; // Ixtiyoriy
}
