import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { Enrollment } from './entities/enrollment.entity';

@Controller('enrollments') // URL: /enrollments
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  // Foydalanuvchini kursga yozish
  @Post()
  async enrollUser(
    @Body() body: { userId: number; courseId: number },
  ): Promise<Enrollment> {
    const { userId, courseId } = body;
    return this.enrollmentService.enrollUser(userId, courseId);
  }

  // Foydalanuvchi tomonidan yozilgan kurslarni olish
  @Get(':userId')
  async getUserEnrollments(
    @Param('userId') userId: number,
  ): Promise<Enrollment[]> {
    return this.enrollmentService.getEnrollmentsByUserId(userId);
  }

  @Get('course/:courseId')
  async getEnrollmentsByCourseId(
    @Param('courseId') courseId: number,
  ): Promise<Enrollment[]> {
    return this.enrollmentService.getEnrollmentsByCourseId(courseId);
  }
}
