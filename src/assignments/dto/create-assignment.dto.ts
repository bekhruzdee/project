// dto/create-assignment.dto.ts
import { IsString, IsNumber } from 'class-validator';

export class CreateAssignmentDto {
  @IsString()
  description: string;

  @IsNumber()
  moduleId: number;

  @IsString() // default qiymatini belgilamaymiz
  gradingType: string;
}
