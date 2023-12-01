import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AllowedPermission } from './permission.decorator';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    const permission = this.reflector.get<AllowedPermission>(
      'permissions',
      context.getHandler(),
    );
    if (!permission) {
      return true;
    }
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const user: User = gqlContext['user'];
    if (!user) {
      return false;
    }
    let result = false;
    Object.keys(permission).forEach((key) => {
      result = user.role.permissions[key]?.includes(...permission[key]);
    });
    return result;
  }
}
