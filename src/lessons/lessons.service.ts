import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { Modules } from 'src/modules/entities/module.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    @InjectRepository(Modules)
    private readonly moduleRepository: Repository<Modules>,
  ) {}

  async create(createLessonDto: CreateLessonDto): Promise<Lesson> {
    const module = await this.moduleRepository.findOneBy({ id: createLessonDto.moduleId });
    if (!module) {
      throw new NotFoundException(`Module with ID ${createLessonDto.moduleId} not found`);
    }

    const lesson = this.lessonRepository.create({
      ...createLessonDto,
      module,
    });

    const savedLesson = await this.lessonRepository.save(lesson);
    console.log(`Lesson "${savedLesson.title}" created successfully.`);
    return savedLesson; // Return saved lesson
  }

  async findAll(): Promise<Lesson[]> {
    return this.lessonRepository.find({ relations: ['module'] });
  }

  async findOne(id: number): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({
      where: { id },
      relations: ['module'],
    });
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }
    return lesson;
  }

  async update(id: number, updateLessonDto: UpdateLessonDto): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOneBy({ id });
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }

    // Check if moduleId is provided in update DTO
    if (updateLessonDto.moduleId) {
      const module = await this.moduleRepository.findOneBy({ id: updateLessonDto.moduleId });
      if (!module) {
        throw new NotFoundException(`Module with ID ${updateLessonDto.moduleId} not found`);
      }
      lesson.module = module;
    }

    Object.assign(lesson, updateLessonDto);
    await this.lessonRepository.save(lesson);
    console.log(`Lesson with ID ${id} updated successfully.`);
    return lesson; // Return updated lesson
  }

  async remove(id: number): Promise<void> {
    const lesson = await this.findOne(id);
    await this.lessonRepository.remove(lesson);
    console.log(`Lesson with ID ${id} removed successfully.`);
  }
}
