import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { Modules } from './entities/module.entity';
import { ModulesService } from './modules.service';

@Controller('modules')
export class ModulesController {
  constructor(private readonly moduleService: ModulesService) {}

  @Post()
  async create(@Body() createModuleDto: CreateModuleDto): Promise<Modules> {
    console.log('Creating module...');
    return this.moduleService.create(createModuleDto);
  }

  @Get()
  async findAll(): Promise<Modules[]> {
    console.log('Fetching all modules...');
    return this.moduleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Modules> {
    console.log(`Fetching module with ID: ${id}`);
    return this.moduleService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateModuleDto: UpdateModuleDto): Promise<Modules> {
    console.log(`Updating module with ID: ${id}`);
    return this.moduleService.update(id, updateModuleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    console.log(`Removing module with ID: ${id}`);
    return this.moduleService.remove(id);
  }
}
