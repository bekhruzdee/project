// dto/update-result.dto.ts
import { IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class UpdateResultDto {
  @IsOptional()
  @IsNumber()
  score?: number;

  @IsOptional()
  @IsBoolean()
  isGraded?: boolean;
}
