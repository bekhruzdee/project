import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto'; // Foydalanuvchini yaratish DTO
import { UpdateUserDto } from './dto/update-user.dto'; // Foydalanuvchini yangilash DTO
import { CreateAdminDto } from './dto/create-admin.dto'; // Admin yaratish DTO
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Yangi foydalanuvchini yaratish
  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ success: boolean; message: string; data?: User }> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      return {
        success: false,
        message: 'User already exists',
      };
    }

    const newUser = this.usersRepository.create(createUserDto);
    const savedUser = await this.usersRepository.save(newUser);

    return {
      success: true,
      message: 'User created successfully',
      data: savedUser,
    };
  }

  // Adminni yaratish
  async createAdmin(createAdminDto: CreateAdminDto): Promise<{ success: boolean; message: string; data?: User }> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createAdminDto.email },
    });

    if (existingUser) {
      return {
        success: false,
        message: 'User already exists',
      };
    }

    // Parolni hashlab saqlash
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);
    
    const newAdmin = this.usersRepository.create({
      ...createAdminDto,
      password: hashedPassword, // Hashed parolni qo'shamiz
    });

    const savedAdmin = await this.usersRepository.save(newAdmin);

    return {
      success: true,
      message: 'Admin created successfully',
      data: savedAdmin,
    };
  }


  // Barcha foydalanuvchilarni olish
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

  // Foydalanuvchini ID orqali olish
  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Foydalanuvchini yangilash
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

  // Foydalanuvchini o'chirish
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

  // Foydalanuvchini yaratish yoki yangilash
  async createOrUpdate(profile: any): Promise<User> {
    const { username, emails } = profile;
    const email = emails[0].value;

    let user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      user = this.usersRepository.create({ username, email });
      await this.usersRepository.save(user);
    }

    return user;
  }
}
