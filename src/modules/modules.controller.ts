import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { Modules } from './entities/module.entity';
import { ModulesService } from './modules.service';
import { LessonsService } from 'src/lessons/lessons.service';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/role.guard';

@Controller('modules')
export class ModulesController {
  constructor(
    private readonly moduleService: ModulesService,
    private readonly lessonService: LessonsService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  async createModule(
    @Body('courseId') courseId: number,
    @Body('name') name: string,
  ): Promise<Modules> {
    return this.moduleService.createModule(courseId, name);
  }

  @Get(':courseId')
  async getAllModules(@Param('courseId') courseId: number): Promise<Modules[]> {
    return this.moduleService.getAllModules(courseId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  async updateModule(
    @Param('id') id: number,
    @Body() body: { name: string },
  ): Promise<Modules> {
    return this.moduleService.updateModule(id, body.name);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async deleteModule(@Param('id') id: number): Promise<string> {
    return this.moduleService.deleteModule(id);
  }

  @UseGuards(AuthGuard)
  @Get(':moduleId/lessons')
  async getModuleWithLessons(
    @Param('moduleId') moduleId: number,
  ): Promise<Modules> {
    return this.moduleService.getModuleWithLessons(moduleId);
  }
}
