// src/auth/auth.guard.ts

import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest<Request>();
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      
      if (!token) {
        throw new UnauthorizedException();
      }
      const payload = await this.jwtService.verify(token, {
        secret: 'Judayam Secret', // bu qatorni env. file'dan olishingiz mumkin
      });
  
      if (!payload) {
        throw new UnauthorizedException();
      }
      request['payload'] = payload;
  
      return true;
    }
  }
  