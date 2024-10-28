// results.controller.ts
import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { ResultsService } from './results.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';

@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  // Natijani yaratish
  @Post()
  async createResult(@Body() dto: CreateResultDto) {
    return this.resultsService.createResult(dto);
  }

  // Barcha natijalarni olish
  @Get()
  async getAllResults() {
    return this.resultsService.getAllResults();
  }

  // ID bo'yicha natijani olish
  @Get('/:id')
  async getResultById(@Param('id') id: number) {
    return this.resultsService.getResultById(id);
  }

  // Natijani yangilash
  @Put('/:id')
  async updateResult(@Param('id') id: number, @Body() dto: UpdateResultDto) {
    return this.resultsService.updateResult(id, dto);
  }

  // Natijani o'chirish
  @Delete('/:id')
  async deleteResult(@Param('id') id: number) {
    return this.resultsService.deleteResult(id);
  }
}
