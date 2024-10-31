import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Patch,
  Query,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/role.guard';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  async create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  async findAll(): Promise<Course[]> {
    const courses = await this.coursesService.findAll();
    return courses.length > 0 ? courses : [];
  }

  @Get('find')
  async findByName(@Query('name') name?: string) {
    if (!name) {
      return { message: 'Please provide a course name to search.' };
    }
    return this.coursesService.findByName(name);
  }

  @Get('category/:category')
  async getCoursesByCategory(
    @Param('category') category: string,
  ): Promise<Course[]> {
    return this.coursesService.findByCategory(category);
  }

  @Get(':courseId/modules')
  async getModulesByCourseId(@Param('courseId') courseId: number) {
    return this.coursesService.getModulesByCourseId(courseId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<string> {
    return this.coursesService.remove(+id);
  }
}
