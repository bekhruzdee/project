import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { CoursesModule } from './courses/courses.module';
import { Course } from './courses/entities/course.entity';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { Enrollment } from './enrollment/entities/enrollment.entity';
import { LessonsModule } from './lessons/lessons.module';
import { Lesson } from './lessons/entities/lesson.entity';
import { ModulesModule } from './modules/modules.module';
import { Modules } from './modules/entities/module.entity';
import { AssignmentsModule } from './assignments/assignments.module';
import { ResultsModule } from './results/results.module';
import { Assignment } from './assignments/entities/assignment.entity';
import { Result } from './results/entities/result.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Course, Enrollment, Modules, Lesson, Assignment, Result],
      synchronize: true,
      // logging: true,
    }),
    AuthModule,
    UserModule,
    CoursesModule,
    EnrollmentModule,
    LessonsModule,
    ModulesModule,
    AssignmentsModule,
    ResultsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
