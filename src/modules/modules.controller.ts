import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { Modules } from './entities/module.entity';
import { ModulesService } from './modules.service';
import { LessonsService } from 'src/lessons/lessons.service';
import { Lesson } from 'src/lessons/entities/lesson.entity';

@Controller('modules')
export class ModulesController {
  constructor(
    private readonly moduleService: ModulesService,
    private readonly lessonService: LessonsService,
  ) {}

  @Post()
  async createModule(
    @Body('courseId') courseId: number,
    @Body('name') name: string,
  ): Promise<Modules> {
    return this.moduleService.createModule(courseId, name);
  }

  @Get(':courseId') // 'courseId' parametrini qo'shdik
  async getAllModules(
    @Param('courseId') courseId: number,
  ): Promise<Modules[]> {
    return this.moduleService.getAllModules(courseId);
  }

  @Get(':moduleId/lessons')
  async getLessonsByModule(
    @Param('moduleId') moduleId: number,
  ): Promise<Lesson[]> {
    const lessons = await this.lessonService.getLessonsByModuleId(moduleId);
    if (lessons.length === 0) {
      throw new NotFoundException('Lessons not found for this module');
    }
    return lessons;
  }

  @Patch(':id')
  async updateModule(
    @Param('id') id: number,
    @Body() body: { name: string },
  ): Promise<Modules> {
    return this.moduleService.updateModule(id, body.name);
  }

  @Delete(':id')
  async deleteModule(@Param('id') id: number): Promise<string> {
    return this.moduleService.deleteModule(id);
  }
}
