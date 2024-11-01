import { Module } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';
import { Enrollment } from './entities/enrollment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Course } from 'src/courses/entities/course.entity';
import { UserModule } from 'src/users/users.module';
import { CoursesModule } from 'src/courses/courses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Enrollment, User, Course]),
    UserModule,
    CoursesModule,
  ],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
})
export class EnrollmentModule {}
