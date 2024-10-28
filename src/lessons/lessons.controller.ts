import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';
import { LessonsService } from './lessons.service';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonService: LessonsService) {}

  @Post()
  async create(@Body() createLessonDto: CreateLessonDto): Promise<Lesson> {
    const lesson = await this.lessonService.create(createLessonDto);
    return lesson; // Return created lesson
  }

  @Get()
  async findAll(): Promise<Lesson[]> {
    return this.lessonService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Lesson> {
    return this.lessonService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateLessonDto: UpdateLessonDto): Promise<Lesson> {
    return this.lessonService.update(id, updateLessonDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.lessonService.remove(id);
  }
}
