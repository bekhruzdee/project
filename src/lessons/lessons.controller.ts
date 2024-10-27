import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { Lesson } from './entities/lesson.entity';
import { LessonsService } from './lessons.service';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonService: LessonsService) {}

  @Post()
  async createLesson(
    @Param('moduleId') moduleId: number,
    @Body() body: { title: string; content: string },
  ): Promise<Lesson> {
    return this.lessonService.createLesson(moduleId, body.title, body.content);
  }

  @Get()
  async getAllLessons(@Param('moduleId') moduleId: number): Promise<Lesson[]> {
    return this.lessonService.getAllLessons(moduleId);
  }

  @Put(':id')
  async updateLesson(
    @Param('id') id: number,
    @Body() body: { title: string; content: string },
  ): Promise<Lesson> {
    return this.lessonService.updateLesson(id, body.title, body.content);
  }

  @Delete(':id')
  async deleteLesson(@Param('id') id: number): Promise<void> {
    return this.lessonService.deleteLesson(id);
  }

  @Get('module-course/:lessonId')
  async getModuleAndCourseByLessonId(@Param('lessonId') lessonId: number): Promise<{ module: any; course: any }> {
    return this.lessonService.getModuleAndCourseByLessonId(lessonId);
  }
}
