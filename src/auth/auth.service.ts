// src/auth/auth.service.ts

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // 1. Ro'yxatdan o'tish funksiyasi
  async create(createAuthDto: CreateAuthDto) {
    // Username va emailni tekshirish
    const existingUser = await this.userRepository.findOne({
      where: [
        { username: createAuthDto.username },
        { email: createAuthDto.email },
      ],
    });
  
    if (existingUser) {
      throw new ConflictException('Username or Email already exists.');
    }
  
    const user = this.userRepository.create();
    user.username = createAuthDto.username;
    user.password = await bcrypt.hash(createAuthDto.password, 10);
    user.email = createAuthDto.email;
  
    await this.userRepository.save(user);
    return 'You are registered✅';
  }
  

  // 2. Kirish funksiyasi va token yaratish
  async login(loginDto: { username: string; password: string }) {
    const user = await this.userRepository.findOneBy({
      username: loginDto.username,
    });
    if (!user) {
      throw new NotFoundException('User Not Found ⚠️');
    }
    const checkPass = await bcrypt.compare(loginDto.password, user.password);
    if (!checkPass) {
      throw new NotFoundException('Password Error ⚠️');
    }

    const payload = { id: user.id, username: user.username, role: user.role };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    const { password, ...userData } = user;
    return { userData, access_token: accessToken, refresh_token: refreshToken };
  }

  // 3. Foydalanuvchi ma'lumotlarini olish funksiyasi
  async getAllMyData(payload: any) {
    const user = await this.userRepository.findOneBy({ id: payload.id });
    return user;
  }
}
