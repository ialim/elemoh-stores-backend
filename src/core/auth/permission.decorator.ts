import { SetMetadata } from '@nestjs/common';
import { AuthActions } from 'src/common/generated-types';
import { CreatePermissionInput } from '../role/dtos/create-permission.dto';

export type AllowedPermission = Partial<Omit<CreatePermissionInput, 'roleId'>>;

export const Permissions = (permissions: AllowedPermission) =>
  SetMetadata('permissions', permissions);
