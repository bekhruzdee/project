import { IsNotEmpty } from 'class-validator';

export class CreateLessonDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  moduleId: number; // Modulni identifikatori
}
