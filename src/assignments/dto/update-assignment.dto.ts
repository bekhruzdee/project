// dto/update-assignment.dto.ts
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateAssignmentDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  moduleId?: number;

  @IsOptional()
  @IsString()
  gradingType?: string;
}
