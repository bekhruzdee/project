import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from './entities/assignment.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { Result } from 'src/results/entities/result.entity';
import { UsersService } from 'src/users/users.service'; // Foydalanuvchilar servisini import qilish

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private readonly assignmentRepository: Repository<Assignment>,
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
    private readonly usersService: UsersService, // Foydalanuvchilar servisini qo'shish
  ) {}

  async create(createAssignmentDto: CreateAssignmentDto): Promise<Assignment> {
    const assignment = this.assignmentRepository.create(createAssignmentDto);
    return await this.assignmentRepository.save(assignment);
  }

  async findAll(): Promise<Assignment[]> {
    return await this.assignmentRepository.find({ relations: ['results', 'results.user'] });
  }

  async findOne(id: number): Promise<Assignment> {
    const assignment = await this.assignmentRepository.findOne({ where: { id }, relations: ['results', 'results.user'] });
    if (!assignment) {
      throw new NotFoundException(`Assignment with ID ${id} not found`);
    }
    return assignment;
  }

  async gradeAssignment(assignmentId: number, userId: number, grade: number): Promise<Result> {
    const assignment = await this.findOne(assignmentId);

    // Foydalanuvchi mavjudligini tekshirish
    const userExists = await this.usersService.findOne(userId);
    if (!userExists) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const result = this.resultRepository.create({
      userId,
      assignment,
      grade,
    });
    return await this.resultRepository.save(result);
  }

  async deleteAssignment(id: number): Promise<string> {
    const assignment = await this.assignmentRepository.findOne({
      where: { id }, // ID ni bu tarzda beramiz
    });
    
    if (!assignment) {
      throw new NotFoundException(`Assignment with ID ${id} not found`);
    }
    
    await this.assignmentRepository.delete(id);
    return 'Delete successfully';
  }
}
