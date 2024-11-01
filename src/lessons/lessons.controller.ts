import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { Lesson } from './entities/lesson.entity';
import { LessonsService } from './lessons.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/role.guard';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonService: LessonsService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  async createLesson(
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('moduleId') moduleId: number,
  ): Promise<Lesson> {
    try {
      return await this.lessonService.createLesson(title, content, moduleId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Module not found');
      }
      throw error;
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  async updateLesson(
    @Param('id') id: number,
    @Body() body: { title: string; content: string },
  ): Promise<Lesson> {
    return this.lessonService.updateLesson(id, body.title, body.content);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async deleteLesson(@Param('id') id: number): Promise<void> {
    return this.lessonService.deleteLesson(id);
  }
}
