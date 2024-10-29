import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ResultsService } from './results.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @UseGuards(AuthGuard)
  @Get('user/:userId')
  async findAllByUser(@Param('userId') userId: number) {
    return await this.resultsService.findAllByUser(userId);
  }
}
