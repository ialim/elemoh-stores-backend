import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllRoleOutput } from './dtos/find-all-roles.dto';
import {
  CreatePermissionInput,
  CreatePermissionOutput,
} from './dtos/create-permission.dto';
import { CreateRoleInput, CreateRoleOutput } from './dtos/create-role.dto';

import { DeleteRoleInput, DeleteRoleOutput } from './dtos/delete-role.dto';
import {
  EditPermissionInput,
  EditPermissionOutput,
} from './dtos/edit-permission.dto';
import { EditRoleInput, EditRoleOutput } from './dtos/edit-role.dto';
import { Permission } from './entities/permission.entity';
import { Role } from './entities/role.entity';
import { FindRoleInput, FindRoleOutput } from './dtos/find-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly Roles: Repository<Role>,
    @InjectRepository(Permission)
    private readonly Permissions: Repository<Permission>,
  ) {}

  async createRole({
    name,
    code,
    description,
  }: CreateRoleInput): Promise<CreateRoleOutput> {
    try {
      const exists = await this.Roles.findOne({ name });
      if (exists) {
        return { ok: false, error: 'This Role already exist' };
      }
      await this.Roles.save(this.Roles.create({ name, code, description }));
      return {
        ok: true,
        error: null,
      };
    } catch (error) {
      return { ok: false, error: "Couldn't create Role" };
    }
  }

  async editRole({
    roleId,
    name,
    code,
    description,
  }: EditRoleInput): Promise<EditRoleOutput> {
    try {
      const role = await this.Roles.findOne({ id: roleId });
      if (Role) {
        name && (role.name = name);
        code && (role.code = code);
        description && (role.description = description);
        await this.Roles.save(role);
        return {
          ok: true,
          error: null,
        };
      } else {
        return {
          ok: false,
          error: 'Role not found',
        };
      }
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  }

  async findRole({ roleId }: FindRoleInput): Promise<FindRoleOutput> {
    try {
      const role = await this.Roles.findOne({ id: roleId });
      if (!role) {
        return {
          ok: false,
          error: 'Role not found',
        };
      }
      return {
        ok: true,
        role,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findAll(): Promise<AllRoleOutput> {
    try {
      const roles = await this.Roles.find({ relations: ['permissions'] });
      if (roles) {
        return {
          ok: true,
          error: null,
          roles: roles,
        };
      }
      return {
        ok: false,
        error: 'No Roles available',
      };
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  }

  async deleteRole({ roleId }: DeleteRoleInput): Promise<DeleteRoleOutput> {
    try {
      const role = await this.Roles.findOne({ id: roleId });
      if (role) {
        await this.Roles.remove(role);
        return {
          ok: true,
          error: null,
        };
      }
      return {
        ok: true,
        error: 'Role not found',
      };
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  }

  async createPermission({
    roleId,
    ...rest
  }: CreatePermissionInput): Promise<CreatePermissionOutput> {
    try {
      const role = await this.Roles.findOne({
        id: roleId,
      });
      if (role) {
        let permission = await this.Permissions.create({
          ...rest,
        });
        permission = await this.Permissions.save(permission);
        role.permissions = permission;
        await this.Roles.save(role);
        return {
          ok: true,
          error: null,
        };
      }
      return {
        ok: false,
        error: 'Role not found',
      };
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  }

  async editPermission({
    permissionId,
    users,
    role,
    order,
    collection,
    people,
    product,
  }: EditPermissionInput): Promise<EditPermissionOutput> {
    try {
      const permission = await this.Permissions.findOne({ id: permissionId });
      if (!permission) {
        return {
          ok: false,
          error: 'permission does not exist',
        };
      }
      permission.users = users;
      permission.collection = collection;
      permission.role = role;
      permission.people = people;
      permission.product = product;
      permission.order = order;

      await this.Permissions.save(permission);
      return {
        ok: true,
        error: null,
      };
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  }
}
