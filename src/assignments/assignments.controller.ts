import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/role.guard';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  async create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return await this.assignmentsService.create(createAssignmentDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.assignmentsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.assignmentsService.findOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id/grade')
  async gradeAssignment(
    @Param('id') assignmentId: number,
    @Body('userId') userId: number,
    @Body('grade') grade: number,
  ) {
    return await this.assignmentsService.gradeAssignment(
      assignmentId,
      userId,
      grade,
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async deleteAssignment(@Param('id') id: number): Promise<string> {
    return await this.assignmentsService.deleteAssignment(id);
  }
}
