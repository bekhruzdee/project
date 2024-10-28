// results.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { Result } from './entities/result.entity';

@Injectable()
export class ResultsService {
  constructor(@InjectRepository(Result) private resultRepo: Repository<Result>) {}

  // Yangi natijani yaratish
  async createResult(dto: CreateResultDto): Promise<Result> {
    const result = this.resultRepo.create(dto);
    return await this.resultRepo.save(result);
  }

  // ID bo'yicha natijani olish
  async getResultById(id: number): Promise<Result> {
    const result = await this.resultRepo.findOne({ where: { id }, relations: ['assignment', 'user'] });
    if (!result) throw new NotFoundException('Result not found');
    return result;
  }

  // Natijani yangilash
  async updateResult(id: number, dto: UpdateResultDto): Promise<Result> {
    const result = await this.getResultById(id);
    Object.assign(result, dto);
    return await this.resultRepo.save(result);
  }

  // Natijani o'chirish
  async deleteResult(id: number): Promise<void> {
    const result = await this.resultRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Result not found');
  }

  // Barcha natijalarni olish
  async getAllResults(): Promise<Result[]> {
    return await this.resultRepo.find({ relations: ['assignment', 'user'] });
  }
}
