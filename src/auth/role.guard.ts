// src/auth/role.guard.ts

import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  
  @Injectable()
  export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      if (!roles) return true;
  
      const request = context.switchToHttp().getRequest();
      const user = request['payload'];
  
      if (!user || !roles.includes(user.role)) {
        throw new UnauthorizedException('Access Denied');
      }
      return true;
    }
  }
  