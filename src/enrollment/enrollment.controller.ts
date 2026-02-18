import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { Enrollment } from './entities/enrollment.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/role.guard';

@Controller('enrollments')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @UseGuards(AuthGuard)
  @Post()
  async enrollUser(
    @Body() body: { userId: string; courseId: number },
  ): Promise<Enrollment> {
    const { userId, courseId } = body;
    return this.enrollmentService.enrollUser(userId, courseId);
  }

  @UseGuards(AuthGuard)
  @Get(':userId')
  async getUserEnrollments(
    @Param('userId') userId: string,
  ): Promise<Enrollment[]> {
    return this.enrollmentService.getEnrollmentsByUserId(userId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Get('course/:courseId')
  async getEnrollmentsByCourseId(
    @Param('courseId') courseId: number,
  ): Promise<Enrollment[]> {
    return this.enrollmentService.getEnrollmentsByCourseId(courseId);
  }
}
