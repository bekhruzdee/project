import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './entities/enrollment.entity';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,
  ) {}

  async enrollUser(userId: number, courseId: number): Promise<Enrollment> {
    const enrollment = this.enrollmentRepository.create({
      user: { id: userId },
      course: { id: courseId },
    });
    return this.enrollmentRepository.save(enrollment);
  }

  // Foydalanuvchi tomonidan yozilgan kurslarni olish
  async getEnrollmentsByUserId(userId: number): Promise<Enrollment[]> {
    const enrollments = await this.enrollmentRepository.find({
      where: { user: { id: userId } },
      relations: ['course'],
    });

    if (enrollments.length === 0) {
      throw new NotFoundException(`No enrollments found for user with ID ${userId}.`);
    }

    return enrollments;
  }

  async getEnrollmentsByCourseId(courseId: number): Promise<Enrollment[]> {
    const enrollments = await this.enrollmentRepository.find({
      where: { course: { id: courseId } },
      relations: ['user'],
    });

    if (enrollments.length === 0) {
      throw new NotFoundException(`No enrollments found for course with ID ${courseId}.`);
    }

    return enrollments;
  }
}
