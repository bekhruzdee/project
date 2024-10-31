import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createAdmin(
    createAdminDto: CreateAdminDto,
  ): Promise<{ success: boolean; message: string; data?: User }> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createAdminDto.email },
    });

    if (existingUser) {
      return {
        success: false,
        message: 'User already exists',
      };
    }

    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);

    const newAdmin = this.usersRepository.create({
      ...createAdminDto,
      password: hashedPassword,
    });

    const savedAdmin = await this.usersRepository.save(newAdmin);

    return {
      success: true,
      message: 'Admin created successfully',
      data: savedAdmin,
    };
  }

  async findAll(): Promise<{
    success: boolean;
    message: string;
    data: User[];
  }> {
    const users = await this.usersRepository.find();
    return {
      success: true,
      message: 'Users data retrieved successfully',
      data: users,
    };
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<{ success: boolean; message: string; data?: User }> {
    const existingUser = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!existingUser) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    await this.usersRepository.update(userId, updateUserDto);
    const updatedUser = await this.usersRepository.findOne({
      where: { id: userId },
    });

    return {
      success: true,
      message: 'User updated successfully',
      data: updatedUser,
    };
  }

  async remove(userId: number): Promise<{ success: boolean; message: string }> {
    const existingUser = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!existingUser) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    await this.usersRepository.delete(userId);

    return {
      success: true,
      message: 'User deleted successfully',
    };
  }
}
