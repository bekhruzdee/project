import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from './entities/assignment.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { Result } from 'src/results/entities/result.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private readonly assignmentRepository: Repository<Assignment>,
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
    private readonly usersService: UsersService,
  ) {}

  async create(createAssignmentDto: CreateAssignmentDto): Promise<Assignment> {
    const assignment = this.assignmentRepository.create(createAssignmentDto);
    return await this.assignmentRepository.save(assignment);
  }

  async findAll(): Promise<Assignment[]> {
    const assignments = await this.assignmentRepository.find({
      relations: ['results', 'results.user'],
    });

    assignments.forEach((assignment) => {
      assignment.results.forEach((result) => {
        if (result.user) {
          delete result.user.password;
        }
      });
    });

    return assignments;
  }

  async findOne(id: number): Promise<Assignment> {
    const assignment = await this.assignmentRepository.findOne({
      where: { id },
      relations: ['results', 'results.user'],
    });

    if (!assignment) {
      throw new NotFoundException(`Assignment with ID ${id} not found`);
    }

    assignment.results.forEach((result) => {
      if (result.user) {
        delete result.user.password;
      }
    });

    return assignment;
  }

  async gradeAssignment(
    assignmentId: number,
    userId: string,
    grade: number,
  ): Promise<Result> {
    const assignment = await this.findOne(assignmentId);

    const userExists = await this.usersService.findOne(userId);
    if (!userExists) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const result = this.resultRepository.create({
      user: { id: userId },
      assignment,
      grade,
    });
    return await this.resultRepository.save(result);
  }

  async deleteAssignment(id: number): Promise<string> {
    const assignment = await this.assignmentRepository.findOne({
      where: { id },
    });

    if (!assignment) {
      throw new NotFoundException(`Assignment with ID ${id} not found`);
    }

    await this.assignmentRepository.delete(id);
    return 'Delete successfully';
  }
}
