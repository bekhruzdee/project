import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { User } from 'src/users/entities/user.entity';
import { Course } from 'src/courses/entities/course.entity';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async enrollUser(userId: number, courseId: number): Promise<Enrollment> {
    const [userExists, courseExists] = await Promise.all([
      this.usersRepository.findOne({ where: { id: userId } }),
      this.courseRepository.findOne({ where: { id: courseId } }),
    ]);

    if (!userExists && !courseExists) {
      throw new NotFoundException('Course and User Not Found');
    }
    if (!userExists) {
      throw new NotFoundException('User Not Found');
    }
    if (!courseExists) {
      throw new NotFoundException('Course Not Found');
    }

    const enrollment = this.enrollmentRepository.create({
      user: { id: userId },
      course: { id: courseId },
    });
    return this.enrollmentRepository.save(enrollment);
  }

  async getEnrollmentsByUserId(userId: number): Promise<Enrollment[]> {
    const enrollments = await this.enrollmentRepository.find({
      where: { user: { id: userId } },
      relations: ['course'],
    });

    if (enrollments.length === 0) {
      throw new NotFoundException(
        `No enrollments found for user with ID ${userId}.`,
      );
    }

    return enrollments;
  }

  async getEnrollmentsByCourseId(courseId: number): Promise<Enrollment[]> {
    const enrollments = await this.enrollmentRepository.find({
      where: { course: { id: courseId } },
      relations: ['user'],
      select: {
        user: {
          id: true,
          username: true,
          role: true,
          created_at: true,
          updated_at: true,
        },
      },
    });

    if (enrollments.length === 0) {
      throw new NotFoundException(
        `No enrollments found for course with ID ${courseId}.`,
      );
    }

    return enrollments;
  }
}
