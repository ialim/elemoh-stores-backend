import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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
import { Role } from './entities/role.entity';
import { RolesService } from './role.service';
import { FindRoleInput, FindRoleOutput } from './dtos/find-role.dto';
import { AuthActions } from 'src/common/generated-types';
import { Permissions } from '../auth/permission.decorator';

@Resolver((of) => Role)
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Mutation((returns) => CreateRoleOutput)
  @Permissions({ role: [AuthActions.CREATE] })
  async createRole(
    @Args('input') createRoleInput: CreateRoleInput,
  ): Promise<CreateRoleOutput> {
    return await this.rolesService.createRole(createRoleInput);
  }

  @Mutation((returns) => EditRoleOutput)
  @Permissions({ role: [AuthActions.UPDATE] })
  async editRole(
    @Args('input') editRoleInput: EditRoleInput,
  ): Promise<EditRoleOutput> {
    return await this.rolesService.editRole(editRoleInput);
  }

  @Query((returns) => FindRoleOutput)
  @Permissions({ role: [AuthActions.VIEW] })
  async findRole(
    @Args() findRoleInput: FindRoleInput,
  ): Promise<FindRoleOutput> {
    return await this.rolesService.findRole(findRoleInput);
  }

  @Query((returns) => AllRoleOutput)
  @Permissions({ role: [AuthActions.VIEW] })
  async allRoles(): Promise<AllRoleOutput> {
    return await this.rolesService.findAll();
  }

  @Mutation((returns) => DeleteRoleOutput)
  @Permissions({ role: [AuthActions.DELETE] })
  async deleteRole(
    @Args() deleteRoleInput: DeleteRoleInput,
  ): Promise<DeleteRoleOutput> {
    return await this.rolesService.deleteRole(deleteRoleInput);
  }

  @Mutation((returns) => CreatePermissionOutput)
  @Permissions({ role: [AuthActions.CREATE] })
  async createPermission(
    @Args('input') createPermissionInput: CreatePermissionInput,
  ): Promise<CreatePermissionOutput> {
    return await this.rolesService.createPermission(createPermissionInput);
  }

  @Mutation((returns) => EditPermissionOutput)
  @Permissions({ role: [AuthActions.UPDATE] })
  async editPermission(
    @Args('input') editPermissionInput: EditPermissionInput,
  ): Promise<EditPermissionOutput> {
    return await this.rolesService.editPermission(editPermissionInput);
  }
}
