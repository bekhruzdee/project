import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Modules } from './entities/module.entity';
import { Repository } from 'typeorm';
import { Course } from 'src/courses/entities/course.entity';

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(Modules)
    private readonly moduleRepository: Repository<Modules>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(createModuleDto: CreateModuleDto): Promise<Modules> {
    const course = await this.courseRepository.findOneBy({ id: createModuleDto.courseId });
    if (!course) {
      throw new NotFoundException(`Course with ID ${createModuleDto.courseId} not found`);
    }
    
    const module = this.moduleRepository.create({
      ...createModuleDto,
      course,
    });

    const savedModule = await this.moduleRepository.save(module);
    console.log(`Module created with ID: ${savedModule.id}`);
    return savedModule;
  }

  async findAll(): Promise<Modules[]> {
    const modules = await this.moduleRepository.find({ relations: ['course', 'lessons'] });
    console.log(`Retrieved ${modules.length} modules`);
    return modules;
  }

  async findOne(id: number): Promise<Modules> {
    const module = await this.moduleRepository.findOne({
      where: { id },
      relations: ['course', 'lessons'],
    });
    if (!module) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }
    console.log(`Module found: ${module.name}`);
    return module;
  }

  async update(id: number, updateModuleDto: UpdateModuleDto): Promise<Modules> {
    const module = await this.moduleRepository.findOneBy({ id });
    if (!module) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }
    
    if (updateModuleDto.courseId) {
      const course = await this.courseRepository.findOneBy({ id: updateModuleDto.courseId });
      if (!course) {
        throw new NotFoundException(`Course with ID ${updateModuleDto.courseId} not found`);
      }
      module.course = course;
    }

    Object.assign(module, updateModuleDto);
    const updatedModule = await this.moduleRepository.save(module);
    console.log(`Module updated with ID: ${updatedModule.id}`);
    return updatedModule;
  }

  async remove(id: number): Promise<void> {
    const module = await this.findOne(id);
    await this.moduleRepository.remove(module);
    console.log(`Module with ID ${id} removed`);
  }
}
