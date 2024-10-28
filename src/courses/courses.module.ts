import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { ModulesModule } from 'src/modules/modules.module';
import { Modules } from 'src/modules/entities/module.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Modules]), ModulesModule],
  controllers: [CoursesController],
  providers: [CoursesService]
})
export class CoursesModule {}
