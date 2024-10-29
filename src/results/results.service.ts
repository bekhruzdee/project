import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from './entities/result.entity';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
  ) {}

  async findAllByUser(userId: number): Promise<Result[]> {
    const results = await this.resultRepository.find({
      where: { user: { id: userId } }, // userId bo'yicha qidiramiz
      relations: ['assignment', 'user'], // user va assignmentni qo'shamiz
    });
    
    if (!results.length) {
      throw new NotFoundException(`No results found for user with ID ${userId}`);
    }
    
    return results;
  }
}
