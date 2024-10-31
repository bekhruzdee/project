import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modules } from './entities/module.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { LessonsModule } from 'src/lessons/lessons.module';
import { LessonsService } from 'src/lessons/lessons.service';

@Module({
  imports: [TypeOrmModule.forFeature([Modules, Lesson, Course]), LessonsModule],
  controllers: [ModulesController],
  providers: [ModulesService, LessonsService],
  exports: [ModulesService],
})
export class ModulesModule {}
