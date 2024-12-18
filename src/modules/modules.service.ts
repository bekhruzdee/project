import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Modules } from './entities/module.entity';
import { Course } from 'src/courses/entities/course.entity';

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(Modules)
    private readonly moduleRepository: Repository<Modules>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async createModule(courseId: number, name: string): Promise<Modules> {
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
    });
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const module = this.moduleRepository.create({ name, course });
    return this.moduleRepository.save(module);
  }

  async getAllModules(courseId: number): Promise<Modules[]> {
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ['modules'],
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course.modules;
  }

  async updateModule(id: number, name: string): Promise<Modules> {
    const module = await this.moduleRepository.findOne({
      where: { id },
    });
    if (!module) {
      throw new NotFoundException('Module not found');
    }

    module.name = name;
    return this.moduleRepository.save(module);
  }

  async deleteModule(id: number): Promise<string> {
    const result = await this.moduleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Module not found');
    }
    return `Module with id ${id} has been successfully deleted`;
  }

  async getModuleWithLessons(moduleId: number): Promise<Modules> {
    const module = await this.moduleRepository.findOne({
      where: { id: moduleId },
      relations: ['lessons'],
    });

    if (!module) {
      throw new NotFoundException('Module not found');
    }

    return module;
  }
}
