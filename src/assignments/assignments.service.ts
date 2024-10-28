// assignments.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { Assignment } from './entities/assignment.entity';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepo: Repository<Assignment>,
  ) {}

  // Yangi topshiriq yaratish
  async createAssignment(dto: CreateAssignmentDto): Promise<Assignment> {
    const assignment = this.assignmentRepo.create(dto);
    return await this.assignmentRepo.save(assignment);
  }

  // ID bo'yicha topshiriqni olish
  async getAssignmentById(id: number): Promise<Assignment> {
    const assignment = await this.assignmentRepo.findOne({
      where: { id },
      relations: ['results'],
    });
    if (!assignment) throw new NotFoundException('Assignment not found');
    return assignment;
  }

  // Topsyriqni yangilash
  async updateAssignment(
    id: number,
    dto: UpdateAssignmentDto,
  ): Promise<Assignment> {
    const assignment = await this.getAssignmentById(id);
    Object.assign(assignment, dto);
    return await this.assignmentRepo.save(assignment);
  }

  // Topsyriqni o'chirish
  async deleteAssignment(id: number): Promise<void> {
    const assignment = await this.assignmentRepo.delete(id);
    if (assignment.affected === 0)
      throw new NotFoundException('Assignment not found');
  }

  // Barcha topshiriqlarni olish
  async getAllAssignments(): Promise<Assignment[]> {
    return await this.assignmentRepo.find({ relations: ['results'] });
  }
}
