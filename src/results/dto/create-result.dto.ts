// dto/create-result.dto.ts
import { IsNumber, IsBoolean } from 'class-validator';

export class CreateResultDto {
  @IsNumber()
  score: number;

  @IsBoolean()
  isGraded?: boolean;

  @IsNumber()
  assignmentId: number;

  @IsNumber()
  userId: number;
}
