// assignments.controller.ts
import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  // Topsyriq yaratish
  @Post()
  async createAssignment(@Body() dto: CreateAssignmentDto) {
    return this.assignmentsService.createAssignment(dto);
  }

  // Barcha topshiriqlarni olish
  @Get()
  async getAllAssignments() {
    return this.assignmentsService.getAllAssignments();
  }

  // ID bo'yicha topshiriqni olish
  @Get('/:id')
  async getAssignmentById(@Param('id') id: number) {
    return this.assignmentsService.getAssignmentById(id);
  }

  // Topsyriqni yangilash
  @Put('/:id')
  async updateAssignment(@Param('id') id: number, @Body() dto: UpdateAssignmentDto) {
    return this.assignmentsService.updateAssignment(id, dto);
  }

  // Topsyriqni o'chirish
  @Delete('/:id')
  async deleteAssignment(@Param('id') id: number) {
    return this.assignmentsService.deleteAssignment(id);
  }
}
