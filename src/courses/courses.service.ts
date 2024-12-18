import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Modules } from 'src/modules/entities/module.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Modules)
    private readonly moduleRepository: Repository<Modules>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = this.courseRepository.create(createCourseDto);
    await this.courseRepository.save(course);
    return course;
  }

  async findAll(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  async findByName(
    name: string,
  ): Promise<{ message: string; courses?: Course[] }> {
    const courses = await this.courseRepository
      .createQueryBuilder('course')
      .where('course.name ILIKE :name', { name: `%${name}%` })
      .getMany();

    if (courses.length === 0) {
      return {
        message: 'Course not found',
      };
    }

    return {
      message: 'Courses found',
      courses,
    };
  }

  
  async findByCategory(category: string): Promise<Course[]> {
    return this.courseRepository.find({ where: { category } });
  }

  async getModulesByCourseId(courseId: number): Promise<{ course: Course }> {
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ['modules'],
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return {
      course,
    };
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course = await this.courseRepository.preload({
      id,
      ...updateCourseDto,
    });
    if (!course) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }
    return this.courseRepository.save(course);
  }

  async remove(id: number): Promise<string> {
    const result = await this.courseRepository.delete(id);
    if (result.affected === 0) {
      throw new Error('Course not found');
    }
    return `Course with id ${id} has been successfully deleted`;
  }
}
