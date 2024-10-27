import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { Modules } from 'src/modules/entities/module.entity';
import { Course } from 'src/courses/entities/course.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    @InjectRepository(Modules)
    private readonly moduleRepository: Repository<Modules>,
  ) {}

  async createLesson(moduleId: number, title: string, content: string): Promise<Lesson> {
    const module = await this.moduleRepository.findOne({where: {
      id: moduleId
    }});
    if (!module) {
      throw new NotFoundException('Module not found');
    }

    const lesson = this.lessonRepository.create({ title, content, module });
    return this.lessonRepository.save(lesson);
  }

  async getLessonsByModuleId(moduleId: number): Promise<Lesson[]> {
    const lessons = await this.lessonRepository.find({ where: { module: { id: moduleId } } });
    if (lessons.length === 0) {
      throw new NotFoundException('Lessons not found for this module');
    }
    return lessons;
  }
  

  async getAllLessons(moduleId: number): Promise<Lesson[]> {
    const module = await this.moduleRepository.findOne({
      where: {
        id: moduleId
      },
     relations: ['lessons'] 
    });
    if (!module) {
      throw new NotFoundException('Module not found');
    }
    return module.lessons;
  }

  async updateLesson(id: number, title: string, content: string): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({where: {
      id
    }});
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    lesson.title = title;
    lesson.content = content;
    return this.lessonRepository.save(lesson);
  }

  async deleteLesson(id: number): Promise<void> {
    const result = await this.lessonRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Lesson not found');
    }
  }

  async getModuleAndCourseByLessonId(lessonId: number): Promise<{ module: Modules; course: Course}> {
    const lesson = await this.lessonRepository.findOne({
      where: { id: lessonId },
      relations: ['module', 'module.course'], // Modul va kurs ma'lumotlarini olish
    });
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    return { module: lesson.module, course: lesson.module.course }; // Modul va kursni qaytarish
  }
}
